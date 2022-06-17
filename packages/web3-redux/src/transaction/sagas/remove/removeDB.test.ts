import { testSaga, expectSaga } from 'redux-saga-test-plan';
import { assert } from 'chai';
// eslint-disable-next-line import/no-unresolved
import { Connector } from 'indexeddb-orm';
import { putRemoveDBSAga, removeDBSaga, watchRemoveDBSaga } from './removeDB.js';
import getDB from '../../../db.js';

import { removeAction, removeDBAction } from '../../actions/index.js';
import { Transaction, validate } from '../../model/index.js';
import { networkId } from '../../../test/data.js';
import { name } from '../../common.js';
import { createStore, StoreType } from '../../../store.js';
import sleep from '../../../utils/sleep.js';

// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-commonjs
const FDBFactory = require('fake-indexeddb/lib/FDBFactory');

describe(`${name}/sagas/removeDB.ts`, () => {
    const item: Transaction = validate({ networkId, hash: '0x0' });
    let db: Connector;

    beforeEach(async () => {
        indexedDB = new FDBFactory();
        db = await getDB();
    });

    describe('unit', () => {
        it('putRemoveDB', async () => {
            const action = removeAction(item);
            testSaga(putRemoveDBSAga, action).next().put(removeDBAction(item, action.meta.uuid)).next().isDone();
        });

        it('removeDBSaga', async () => {
            const models = await db.connect();
            testSaga(removeDBSaga, removeDBAction(item))
                .next()
                .call(getDB)
                .next(db)
                .call([db, db.connect])
                .next(models)
                .call([models[name], models[name].delete], item.id)
                .next()
                .isDone();
        });
    });

    describe('integration', () => {
        it('removeDBSaga', async () => {
            //DB State
            const models = await db.connect();
            await models[name].create(item);

            await expectSaga(removeDBSaga, removeDBAction(item)).run();

            //DB State
            const record = await models[name].find(item.id);
            assert.isNull(record);
        });

        it('watchRemoveDBSaga', async () => {
            //DB State
            const models = await db.connect();
            await models[name].create(item);

            await expectSaga(watchRemoveDBSaga).dispatch(removeDBAction(item)).run();

            //DB State
            const record = await models[name].find(item.id);
            assert.isNull(record);
        });
    });

    describe('store', () => {
        let store: StoreType;

        beforeEach(async () => {
            ({ store } = createStore());
        });

        it('removeDBAction', async () => {
            //DB State
            const models = await db.connect();
            await models[name].create(item);

            store.dispatch(removeDBAction(item));
            await sleep(100);

            //DB State
            const record = await models[name].find(item.id);
            assert.isNull(record);
        });
    });
});

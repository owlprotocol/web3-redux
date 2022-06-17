import { testSaga, expectSaga } from 'redux-saga-test-plan';
import { assert } from 'chai';
// eslint-disable-next-line import/no-unresolved
import { Connector } from 'indexeddb-orm';
import { putUpdateDBSaga, updateDBSaga, watchUpdateDBSaga } from './updateDB.js';
import getDB from '../../../db.js';

import { updateAction, updateDBAction } from '../../actions/index.js';
import { BlockHeader, validate } from '../../model/index.js';
import { networkId } from '../../../test/data.js';
import { name } from '../../common.js';
import { createStore, StoreType } from '../../../store.js';
import sleep from '../../../utils/sleep.js';

// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-commonjs
const FDBFactory = require('fake-indexeddb/lib/FDBFactory');

describe(`${name}/sagas/updateDB.ts`, () => {
    const itemInitial: BlockHeader = validate({ networkId, number: 1, hash: '0x0' });
    const item: BlockHeader = validate({ networkId, number: 1, hash: '0x1' });
    let db: Connector;

    beforeEach(async () => {
        indexedDB = new FDBFactory();
        db = await getDB();
    });

    describe('unit', () => {
        it('putUpdateDBSaga', async () => {
            const action = updateAction(item);
            testSaga(putUpdateDBSaga, action).next().put(updateDBAction(item, action.meta.uuid)).next().isDone();
        });

        it('updateDBSaga', async () => {
            const models = await db.connect();
            testSaga(updateDBSaga, updateDBAction(item))
                .next()
                .call(getDB)
                .next(db)
                .call([db, db.connect])
                .next(models)
                .call([models[name], models[name].save], item.id, item, true)
                .next()
                .isDone();
        });
    });

    describe('integration', () => {
        it('updateDBSaga', async () => {
            //DB State
            const models = await db.connect();
            await models[name].create(itemInitial);

            await expectSaga(updateDBSaga, updateDBAction(item)).run();

            //DB State
            const record = await models[name].find(item.id);
            assert.isDefined(record);
            assert.deepEqual(record, item);
        });

        it('watchUpdateDBSaga', async () => {
            //DB State
            const models = await db.connect();
            await models[name].create(itemInitial);

            await expectSaga(watchUpdateDBSaga).dispatch(updateDBAction(item)).run();

            //DB State
            const record = await models[name].find(item.id);
            assert.isDefined(record);
            assert.deepEqual(record, item);
        });
    });

    describe('store', () => {
        let store: StoreType;

        beforeEach(async () => {
            ({ store } = createStore());
        });

        it('updateDBAction', async () => {
            //DB State
            const models = await db.connect();
            await models[name].create(itemInitial);

            store.dispatch(updateDBAction(item));
            await sleep(100);

            //DB State
            const record = await models[name].find(item.id);
            assert.isDefined(record);
            assert.deepEqual(record, item);
        });
    });
});

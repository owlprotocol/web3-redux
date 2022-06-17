import { testSaga, expectSaga } from 'redux-saga-test-plan';
import { assert } from 'chai';
// eslint-disable-next-line import/no-unresolved
import { Connector, TransactionModes } from 'indexeddb-orm';
import { putRemoveDBBatchedSaga, removeDBBatchedSaga, watchRemoveDBBatchedSaga } from './removeDBBatched.js';
import getDB from '../../../db.js';

import { removeBatchedAction, removeDBBatchedAction } from '../../actions/index.js';
import { Network, validate } from '../../model/index.js';
import { networkId } from '../../../test/data.js';
import { name } from '../../common.js';
import { createStore, StoreType } from '../../../store.js';
import sleep from '../../../utils/sleep.js';

// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-commonjs
const FDBFactory = require('fake-indexeddb/lib/FDBFactory');

describe(`${name}/sagas/removeDBBatched.ts`, () => {
    const item: Network = validate({ networkId });
    let db: Connector;

    beforeEach(async () => {
        indexedDB = new FDBFactory();
        db = await getDB();
    });

    describe('unit', () => {
        it('putRemoveDBBatchedSaga', async () => {
            const action = removeBatchedAction([item]);
            testSaga(putRemoveDBBatchedSaga, action)
                .next()
                .put(removeDBBatchedAction([item], action.meta.uuid))
                .next()
                .isDone();
        });

        it('removeDBBatchedSaga', async () => {
            const models = await db.connect();
            testSaga(removeDBBatchedSaga, removeDBBatchedAction([item]))
                .next()
                .call(getDB)
                .next(db)
                .call([db, db.connect])
                .next(models)
                .call([models[name], models[name].openTransaction], TransactionModes.Write);
            //Cannot test all() effect:w
        });
    });

    describe('integration', () => {
        it('removeDBBatchedSaga', async () => {
            //DB State
            const models = await db.connect();
            await models[name].create(item);

            await expectSaga(removeDBBatchedSaga, removeDBBatchedAction([item])).run();

            //DB State
            const record = await models[name].find(item.networkId);
            assert.isNull(record);
        });

        it('watchRemoveDBBatchedSaga', async () => {
            //DB State
            const models = await db.connect();
            await models[name].create(item);

            await expectSaga(watchRemoveDBBatchedSaga)
                .dispatch(removeDBBatchedAction([item]))
                .run();

            //DB State
            const record = await models[name].find(item.networkId);
            assert.isNull(record);
        });
    });

    describe('store', () => {
        let store: StoreType;

        beforeEach(async () => {
            ({ store } = createStore());
        });

        it('removeDBBatchedAction', async () => {
            //DB State
            const models = await db.connect();
            await models[name].create(item);

            store.dispatch(removeDBBatchedAction([item]));
            await sleep(100);

            //DB State
            const record = await models[name].find(item.networkId);
            assert.isNull(record);
        });
    });
});

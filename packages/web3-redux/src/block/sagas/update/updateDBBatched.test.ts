import { testSaga, expectSaga } from 'redux-saga-test-plan';
import { assert } from 'chai';
// eslint-disable-next-line import/no-unresolved
import { Connector, TransactionModes } from 'indexeddb-orm';
import { putUpdateDBBatchedSaga, updateDBBatchedSaga, watchUpdateDBBatchedSaga } from './updateDBBatched.js';
import { updateBatchedAction, updateDBBatchedAction } from '../../actions/index.js';
import getDB from '../../../db.js';
import { name } from '../../common.js';

import { BlockHeader, validate } from '../../model/index.js';
import { networkId } from '../../../test/data.js';
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
        it('putUpdateDBBatchedAction', async () => {
            const action = updateBatchedAction([item]);
            testSaga(putUpdateDBBatchedSaga, action)
                .next()
                .put(updateDBBatchedAction([item], action.meta.uuid))
                .next()
                .isDone();
        });

        it('updateDBBatchedSaga', async () => {
            const models = await db.connect();
            testSaga(updateDBBatchedSaga, updateDBBatchedAction([item]))
                .next()
                .call(getDB)
                .next(db)
                .call([db, db.connect])
                .next(models)
                .call([models[name], models[name].openTransaction], TransactionModes.Write);
        });
    });

    describe('integration', () => {
        it('updateDBBatchedSaga', async () => {
            //DB State
            const models = await db.connect();
            await models[name].create(itemInitial);

            await expectSaga(updateDBBatchedSaga, updateDBBatchedAction([item])).run();

            //DB State
            const record = await models[name].find(item.id);
            assert.isDefined(record);
            assert.deepEqual(record, item);
        });

        it('watchUpdateDBBatchedSaga', async () => {
            //DB State
            const models = await db.connect();
            await models[name].create(itemInitial);

            await expectSaga(watchUpdateDBBatchedSaga)
                .dispatch(updateDBBatchedAction([item]))
                .run();

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

        it('updateDBBatchedAction', async () => {
            //DB State
            const models = await db.connect();
            await models[name].create(itemInitial);

            store.dispatch(updateDBBatchedAction([item]));
            await sleep(100);

            //DB State
            const record = await models[name].find(item.id);
            assert.isDefined(record);
            assert.deepEqual(record, item);
        });
    });
});

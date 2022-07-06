import { testSaga, expectSaga } from 'redux-saga-test-plan';
import { assert } from 'chai';
import { createDBSaga, watchCreateDBSaga } from './createDB.js';
import { getDB, Web3ReduxDexie } from '../../../db.js';

import { createAction } from '../../actions/index.js';
import { BlockHeader, validate } from '../../model/index.js';
import { networkId } from '../../../test/data.js';
import { name } from '../../common.js';
import { createStore, StoreType } from '../../../store.js';

// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-commonjs
const FDBFactory = require('fake-indexeddb/lib/FDBFactory');

describe(`${name}/sagas/createDB.ts`, () => {
    const item: BlockHeader = validate({ networkId, number: 1 });
    let db: Web3ReduxDexie;

    beforeEach(async () => {
        indexedDB = new FDBFactory();
        db = getDB();
    });

    describe('unit', () => {
        it('createDBSaga', async () => {
            testSaga(createDBSaga, createAction(item)).next().call([db.blocks, db.blocks.add], item).next().isDone();
        });
    });

    describe('integration', () => {
        it('createDBSaga', async () => {
            await expectSaga(createDBSaga, createAction(item)).run();

            //DB State
            const record = await db.blocks.get([item.networkId, item.number]);
            assert.isDefined(record);
            assert.deepEqual(record, item);
        });

        it('watchCreateDBSaga', async () => {
            await expectSaga(watchCreateDBSaga).dispatch(createAction(item)).run();

            //DB State
            const record = await db.blocks.get([item.networkId, item.number]);
            assert.isDefined(record);
            assert.deepEqual(record, item);
        });
    });

    describe('store', () => {
        let store: StoreType;

        beforeEach(async () => {
            ({ store } = createStore());
        });

        it('createDBAction', async () => {
            store.dispatch(createAction(item));

            //DB State
            const record = await db.blocks.get([item.networkId, item.number]);
            assert.isDefined(record);
            assert.deepEqual(record, item);
        });
    });
});

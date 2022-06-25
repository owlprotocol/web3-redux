import { testSaga, expectSaga } from 'redux-saga-test-plan';
import { assert } from 'chai';
// eslint-disable-next-line import/no-unresolved
import { Connector } from 'indexeddb-orm';
import Web3 from 'web3';
import { putCreateDBSaga, createDBSaga, watchCreateDBSaga } from './createDB.js';
import getDB from '../../../db.js';

import { createAction, createDBAction } from '../../actions/index.js';
import { Network, validate } from '../../model/index.js';
import { networkId } from '../../../test/data.js';
import { name } from '../../common.js';
import { createStore, StoreType } from '../../../store.js';
import getWeb3Provider from '../../../test/getWeb3Provider.js';

// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-commonjs
const FDBFactory = require('fake-indexeddb/lib/FDBFactory');

describe(`${name}/sagas/createDB.ts`, () => {
    //@ts-expect-error
    const item: Network = validate({ networkId, web3: new Web3(getWeb3Provider()) });
    let db: Connector;

    beforeEach(async () => {
        indexedDB = new FDBFactory();
        db = await getDB();
    });

    describe('unit', () => {
        it('putCreateDBSaga', async () => {
            const action = createAction(item);
            testSaga(putCreateDBSaga, action).next().put(createDBAction(item, action.meta.uuid)).next().isDone();
        });

        it('createDBSaga', async () => {
            const models = await db.connect();
            testSaga(createDBSaga, createDBAction(item))
                .next()
                .call(getDB)
                .next(db)
                .call([db, db.connect])
                .next(models)
                .call([models[name], models[name].create], { networkId })
                .next()
                .isDone();
        });
    });

    describe('integration', () => {
        it('createDBSaga', async () => {
            await expectSaga(createDBSaga, createDBAction(item)).run();

            //DB State
            const models = await db.connect();
            const record = await models[name].find(item.networkId);
            assert.isDefined(record);
            assert.deepEqual(record, { networkId });
        });

        it('watchCreateDBSaga', async () => {
            await expectSaga(watchCreateDBSaga).dispatch(createDBAction(item)).run();

            //DB State
            const models = await db.connect();
            const record = await models[name].find(item.networkId);
            assert.isDefined(record);
            assert.deepEqual(record, { networkId });
        });
    });

    describe('store', () => {
        let store: StoreType;

        beforeEach(async () => {
            ({ store } = createStore());
        });

        it('createDBAction', async () => {
            store.dispatch(createDBAction(item));

            //DB State
            const models = await db.connect();
            const record = await models[name].find(item.networkId);
            assert.isDefined(record);
            assert.deepEqual(record, { networkId });
        });
    });
});

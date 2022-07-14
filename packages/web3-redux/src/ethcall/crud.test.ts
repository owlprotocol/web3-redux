import { assert } from 'chai';

import { name } from './common.js';
import { ethCall1 } from './data.js';
import EthCallCRUD from './crud.js';
import { createStore, StoreType } from '../store.js';
import getDB from '../db.js';

describe(`${name}/crud.test.js`, () => {
    describe('store', () => {
        let store: StoreType;

        beforeEach(async () => {
            store = createStore();
            store.dispatch(EthCallCRUD.actions.create(ethCall1));
        });

        it('byId', async () => {
            const selected = await EthCallCRUD.db.get({
                networkId: ethCall1.networkId,
                to: ethCall1.to,
                data: ethCall1.data,
            });
            assert.deepEqual(selected, ethCall1);
        });

        it('byMethod', async () => {
            const db = getDB();
            const table = db.EthCall;
            const selected = await table.get({
                methodName: ethCall1.methodName,
            });
            assert.deepEqual(selected, ethCall1);
        });

        it.skip('byStatus', async () => {
            //Not indexed
            const db = getDB();
            const table = db.EthCall;
            const selected = await table.get({
                status: 'LOADING',
            });
            assert.deepEqual(selected, ethCall1);
        });
    });
});

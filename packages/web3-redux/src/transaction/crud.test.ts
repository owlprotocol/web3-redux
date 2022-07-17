import { assert } from 'chai';

import { name } from './common.js';
import { transaction1 } from './data.js';
import TransactionCRUD from './crud.js';
import { createStore, StoreType } from '../store.js';

describe(`${name}/crud.test.js`, () => {
    describe('store', () => {
        let store: StoreType;

        beforeEach(async () => {
            store = createStore();
        });

        it('create', async () => {
            store.dispatch(TransactionCRUD.actions.create(transaction1));

            //Redux ORM
            /*
            const transaction1Redux = TransactionCRUD.selectors.selectByIdSingle(store.getState(), {
                networkId: transaction1.networkId,
                number: transaction1.number,
            });
            assert.deepEqual(transaction1Redux, block1);
            */

            //Dexie
            const transaction1Dexie = await TransactionCRUD.db.get({
                networkId: transaction1.networkId,
                hash: transaction1.hash,
            });
            assert.deepEqual(transaction1Dexie, transaction1);
        });
    });
});

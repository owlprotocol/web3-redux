import { assert } from 'chai';

import { name } from './common.js';
import { error1 } from './data.js';
import ErrorCRUD from './crud.js';
import { createStore, StoreType } from '../store.js';

describe(`${name}/crud.test.js`, () => {
    describe('store', () => {
        let store: StoreType;

        beforeEach(async () => {
            store = createStore();
        });

        it('create', async () => {
            store.dispatch(ErrorCRUD.actions.create(error1));

            //Redux ORM
            /*
            const error1Redux = TransactionCRUD.selectors.selectByIdSingle(store.getState(), {
                networkId: error1.networkId,
                number: error1.number,
            });
            assert.deepEqual(error1Redux, block1);
            */

            //Dexie
            const error1Dexie = await ErrorCRUD.db.get(error1.id);
            assert.deepEqual(error1Dexie, error1);
        });
    });
});

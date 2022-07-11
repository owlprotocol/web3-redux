import { assert } from 'chai';

import { name } from './common.js';
import { block1 } from './data.js';
import BlockCRUD from './crud.js';
import { createStore, StoreType } from '../store.js';

describe(`${name}/crud.test.js`, () => {
    describe('store', () => {
        let store: StoreType;

        beforeEach(async () => {
            store = createStore();
        });

        it('create', async () => {
            store.dispatch(BlockCRUD.actions.create(block1));

            //Redux ORM
            /*
            const block1Redux = BlockCRUD.selectors.selectByIdSingle(store.getState(), {
                networkId: block1.networkId,
                number: block1.number,
            });
            assert.deepEqual(block1Redux, block1);
            */

            //Dexie
            const block1Dexie = await BlockCRUD.db.get({ networkId: block1.networkId, number: block1.number });
            assert.deepEqual(block1Dexie, block1);
        });
    });
});

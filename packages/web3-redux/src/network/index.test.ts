import { assert } from 'chai';
import { name } from './common.js';
import { createAction as createBlock, validateBlock } from '../block/index.js';
import { createStore, StoreType } from '../store.js';

import { networkId } from '../test/data.js';
import { createAction, selectByIdSingle, selectLatestBlock, selectLatestBlockNumber } from './index.js';

describe(`${name}.integration`, () => {
    const item = {
        networkId,
    };
    const id = item.networkId;

    let store: StoreType;

    const block1 = { networkId, number: 1, transactions: [] };
    const block2 = { networkId, number: 2, transactions: [] };
    const block3 = { networkId, number: 3, transactions: [] };

    beforeEach(() => {
        ({ store } = createStore());
    });

    describe('selectors', () => {
        it('selectByIdSingle', () => {
            store.dispatch(createAction(item));
            const selected = selectByIdSingle(store.getState(), id);
            assert.deepEqual(selected, item);
        });

        it('selectLatestBlock', async () => {
            const blockValidated1 = validateBlock(block1);
            store.dispatch(createAction(item));

            //Middleware updates latestBlockNumber
            store.dispatch(BlockCRUD.actions.create(block1));

            const selected1 = selectLatestBlock(store.getState(), id);

            assert.deepEqual(selected1, blockValidated1, 'latestBlock != blockValidated1');
        });

        it('selectLatestBlockNumber', async () => {
            store.dispatch(createAction(item));

            const selected0 = selectLatestBlockNumber(store.getState(), id);
            assert.isUndefined(selected0);

            //Middleware updates latestBlockNumber
            store.dispatch(BlockCRUD.actions.create(block1));
            const selected1 = selectLatestBlockNumber(store.getState(), id);
            assert.equal(selected1, 1, 'latestBlockNumber != 1');

            //latestBlockNumber updated to 3
            store.dispatch(BlockCRUD.actions.create(block3));
            const selected2 = selectLatestBlockNumber(store.getState(), id);
            assert.equal(selected2, 3, 'latestBlockNumber != 3');

            //latestBlockNumber unchanged
            store.dispatch(BlockCRUD.actions.create(block2));
            const selected3 = selectLatestBlockNumber(store.getState(), id);
            assert.equal(selected3, 3, 'latestBlockNumber != 3');
        });
    });
});

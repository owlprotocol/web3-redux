import { assert } from 'chai';
import { create as createBlock, validateBlock } from '../block';
import { createStore, StoreType } from '../store';

import { create, selectByIdSingle, selectLatestBlock, selectLatestBlockNumber } from './index';
import { name } from './common';
import { networkId } from '../test/data';

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
        store = createStore();
    });

    describe('selectors', () => {
        it('selectByIdSingle', () => {
            store.dispatch(create(item));
            const selected = selectByIdSingle(store.getState(), id);
            assert.deepEqual(selected, item);
        });

        it('selectLatestBlock', async () => {
            const blockValidated1 = validateBlock(block1);
            store.dispatch(create(item));

            //Middleware updates latestBlockNumber
            store.dispatch(createBlock(block1));

            const selected1 = selectLatestBlock(store.getState(), id);

            assert.deepEqual(selected1, blockValidated1, 'latestBlock != blockValidated1');
        });

        it('selectLatestBlockNumber', async () => {
            store.dispatch(create(item));

            const selected0 = selectLatestBlockNumber(store.getState(), id);
            assert.isUndefined(selected0);

            //Middleware updates latestBlockNumber
            store.dispatch(createBlock(block1));
            const selected1 = selectLatestBlockNumber(store.getState(), id);
            assert.equal(selected1, 1, 'latestBlockNumber != 1');

            //latestBlockNumber updated to 3
            store.dispatch(createBlock(block3));
            const selected2 = selectLatestBlockNumber(store.getState(), id);
            assert.equal(selected2, 3, 'latestBlockNumber != 3');

            //latestBlockNumber unchanged
            store.dispatch(createBlock(block2));
            const selected3 = selectLatestBlockNumber(store.getState(), id);
            assert.equal(selected3, 3, 'latestBlockNumber != 3');
        });
    });
});

import { assert } from 'chai';
import { create as createBlock, validateBlock } from '../block';
import { createStore, StoreType } from '../store';

import { create, selectByIdSingle, selectLatestBlock, selectLatestBlockNumber } from './index';
import { name } from './common';

describe(`${name}.integration`, () => {
    const networkId = '1337';
    const item = {
        networkId,
    };
    const id = item.networkId;

    let store: StoreType;

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
            const block1 = { networkId, number: 1 };
            const blockValidated1 = validateBlock(block1);
            store.dispatch(create(item));
            store.dispatch(createBlock(block1));

            const selected1 = selectLatestBlock(store.getState(), id);

            assert.deepEqual(selected1, blockValidated1, 'latestBlock != blockValidated1');
        });

        it('selectLatestBlockNumber', async () => {
            const block1 = { networkId, number: 1 };
            store.dispatch(create(item));
            store.dispatch(createBlock(block1));

            const selected1 = selectLatestBlockNumber(store.getState(), id);

            assert.deepEqual(selected1, 1, 'latestBlockNumber != 1');
        });
    });
});

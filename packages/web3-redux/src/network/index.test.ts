import { assert } from 'chai';
import { name } from './common.js';
import NetworkCRUD from './crud.js';
import { createStore, StoreType } from '../store.js';

import { networkId } from '../test/data.js';

describe(`${name}.integration`, () => {
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
            store.dispatch(NetworkCRUD.actions.create(item));
            const selected = NetworkCRUD.selectors.selectByIdSingle(store.getState(), id);
            assert.deepEqual(selected, item);
        });
    });
});

import { assert } from 'chai';
import { createStore, StoreType } from '../store';
import { validate, create, selectByIdSingle } from './index';
import { name } from './common';
import { addressList } from '../test/utils';

describe(`${name}.integration`, () => {
    const networkId = '1337';
    const item = { networkId, hash: '0x1', from: addressList[0], to: addressList[1] };
    const itemWithId = validate(item);

    let store: StoreType;

    beforeEach(() => {
        store = createStore();
    });

    describe('selectors', () => {
        it('selectByIdSingle', () => {
            store.dispatch(create(item));
            const selected1 = selectByIdSingle(store.getState(), item);
            assert.deepEqual(selected1, itemWithId);
        });
    });
});

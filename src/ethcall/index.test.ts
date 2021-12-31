import { assert } from 'chai';
import { createStore, StoreType } from '../store';
import { getIdArgs, validate, create, selectByIdSingle } from './index';
import { addressList } from '../test/utils';
import { name } from './common';

describe(`${name}.integration`, () => {
    const networkId = '1337';
    const item = {
        networkId,
        from: addressList[0],
        to: addressList[1],
        data: '0x1',
    };
    const id = getIdArgs(item);
    const itemWithId = validate(item);

    let store: StoreType;

    beforeEach(() => {
        store = createStore();
    });

    describe('selectors', () => {
        it('selectByIdSingle', () => {
            store.dispatch(create(item));
            const selected = selectByIdSingle(store.getState(), id);
            assert.deepEqual(selected, itemWithId);
        });
    });
});

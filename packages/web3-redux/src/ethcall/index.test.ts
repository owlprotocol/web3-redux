import { assert } from 'chai';
import { name } from './common.js';
import { createStore, StoreType } from '../store.js';
import { addressList } from '../test/data.js';
import { getIdArgs, validate, createAction, selectByIdSingle } from './index.js';

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
        ({ store } = createStore());
    });

    describe('selectors', () => {
        it('selectByIdSingle', () => {
            store.dispatch(createAction(item));
            const selected = selectByIdSingle(store.getState(), id);
            assert.deepEqual(selected, itemWithId);
        });
    });
});

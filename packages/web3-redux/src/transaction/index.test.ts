import { assert } from 'chai';
import { batchActions } from 'redux-batched-actions';
import { name } from './common.js';
import { createStore, StoreType } from '../store.js';
import { networkId, transaction1 } from '../test/data.js';
import { create, selectByIdSingle, selectByFilter } from './index.js';

describe(`${name}.integration`, () => {
    let store: StoreType;

    beforeEach(() => {
        ({ store } = createStore());
    });

    describe('selectors', () => {
        it('selectByIdSingle', () => {
            store.dispatch(create(transaction1));
            const selected1 = selectByIdSingle(store.getState(), { networkId, hash: transaction1.hash });
            assert.deepEqual(selected1, transaction1);
        });
        it('selectByIdSingle - batched create', () => {
            const createAction = create(transaction1);
            const actions = batchActions([createAction], `${createAction.type}/1`);
            store.dispatch(actions);
            const selected1 = selectByIdSingle(store.getState(), { networkId, hash: transaction1.hash });
            assert.deepEqual(selected1, transaction1);
        });
        it('selectByFilter', () => {
            store.dispatch(create(transaction1));
            const selected1 = selectByFilter(store.getState(), { networkId, from: transaction1.from });
            assert.deepEqual(selected1, [transaction1]);
        });
    });
});
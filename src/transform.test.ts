import { assert } from 'chai';
import { Persistor } from 'redux-persist';
import { create as createTransaction } from './transaction/actions';

import { createStore, StoreType } from './store';
import { Web3ReduxTransform } from './transform';
import { LocalStorageAsyncMock } from './test/localstorageAsync';
import { state, transaction1 } from './test/data';

describe('redux-persist', () => {
    describe('transform', () => {
        it.skip('in()', () => {
            const outState = Web3ReduxTransform.in(state.web3Redux, 'web3Redux', state);
            assert.deepEqual(outState, state.web3Redux); //No omitted objects (Web3, Web3.eth.Contract, Sync)
        });
        it.skip('out()', () => {
            const inState = Web3ReduxTransform.out(state.web3Redux, 'web3Redux', state);
            assert.deepEqual(inState, state.web3Redux);
        });
    });

    describe('integration', () => {
        const localStorage = new LocalStorageAsyncMock();
        let store: StoreType;
        let persistor: Persistor;

        beforeEach(() => {
            ({ store, persistor } = createStore({ persistStorage: localStorage }));
        });

        it('simple', async () => {
            store.dispatch(createTransaction(transaction1));

            console.debug(persistor.getState());
            persistor.persist();
            console.debug(persistor.getState());
            console.debug(localStorage);
        });
    });
});

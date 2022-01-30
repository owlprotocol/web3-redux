import { assert } from 'chai';
//import { Persistor } from 'redux-persist';
import { mapValues, omit } from 'lodash';
import { create as createTransaction } from './transaction/actions';

import { createStore, StoreType } from './store';
import { ContractTransform, NetworkTransform } from './transform';
import { LocalStorageAsyncMock } from './test/localstorageAsync';
import { state, transaction1 } from './test/data';
import { sleep } from './utils';

describe('redux-persist', () => {
    describe('NetworkTransform', () => {
        it('in()', () => {
            const outState = NetworkTransform.in(state.web3Redux.Network, 'Network', state);
            assert.deepEqual(outState, state.web3Redux.Network); //No omitted objects (Web3, Web3.eth.Contract, Sync)
        });
        it('out()', () => {
            const inState = NetworkTransform.out(state.web3Redux.Network, 'Network', state);
            assert.deepEqual(inState, state.web3Redux.Network);
        });
    });

    describe('ContractTransform', () => {
        it('in()', () => {
            const outState = ContractTransform.in(state.web3Redux.Contract, 'Contract', state);
            assert.deepEqual(outState, state.web3Redux.Contract); //No omitted objects (Web3, Web3.eth.Contract, Sync)
        });
        it('out()', () => {
            const inState = ContractTransform.out(state.web3Redux.Contract, 'Contract', state);
            assert.deepEqual(inState, state.web3Redux.Contract);
        });
    });

    describe('integration', () => {
        const localStorage = new LocalStorageAsyncMock();
        let store: StoreType;
        //let persistor: Persistor;

        beforeEach(() => {
            ({ store } = createStore({ persistStorage: localStorage }));
        });

        it('simple', async () => {
            store.dispatch(createTransaction(transaction1));

            //Async persistor
            await sleep(100);

            const stateString = await localStorage.getItem('persist:web3Redux');
            const stateParsed = JSON.parse(stateString);
            let state = mapValues(stateParsed, (x) => JSON.parse(x));
            state = mapValues(state, (x) => omit(x, ['meta']));

            let expectedState = omit(store.getState().web3Redux, ['Sync', '@@_______REDUX_ORM_STATE_FLAG']) as any;
            expectedState = mapValues(expectedState, (x) => omit(x, ['meta']));

            assert.deepEqual(state, expectedState);
        });
    });
});

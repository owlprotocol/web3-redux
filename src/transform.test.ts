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

            const persistedString = await localStorage.getItem('persist:web3Redux');
            const persistedParsed = mapValues(JSON.parse(persistedString), (x) => JSON.parse(x));
            const persistedModels = omit(persistedParsed, ['@@_______REDUX_ORM_STATE_FLAG', '_persist']);
            const persistedModelsNoMeta = mapValues(persistedModels, (x) => omit(x, ['meta']));
            const persisted = {
                ...persistedModelsNoMeta,
                ['@@_______REDUX_ORM_STATE_FLAG']: persistedParsed['@@_______REDUX_ORM_STATE_FLAG'],
                ['_persist']: persistedParsed['_persist'],
            }; //Add back non ORM fields

            const stateParsed = store.getState().web3Redux;
            //Ignore Sync model
            stateParsed.Sync = {
                indexes: {},
                items: [],
                itemsById: {},
            };
            const stateModels = omit(stateParsed, ['@@_______REDUX_ORM_STATE_FLAG', '_persist']);
            const stateModelsNoMeta = mapValues(stateModels, (x) => omit(x, ['meta'])) as any;
            const state = {
                ...stateModelsNoMeta,
                ['@@_______REDUX_ORM_STATE_FLAG']: stateParsed['@@_______REDUX_ORM_STATE_FLAG'],
                ['_persist']: stateParsed['_persist'],
            }; //Add back non ORM fields

            assert.deepEqual(persisted, state);
        });
    });
});

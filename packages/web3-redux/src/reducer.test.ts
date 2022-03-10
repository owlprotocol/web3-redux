import { assert } from 'chai';
import { Persistor, getStoredState } from 'redux-persist';
import { mapValues, omit } from 'lodash';
import { create as createTransaction } from './transaction/actions/index.js';
import { create as createNetwork } from './network/actions/index.js';
import { selectByIdSingle as selectNetwork } from './network/selectors/index.js';

import { createStore, StoreType } from './store.js';
import { ContractTransform, NetworkTransform, SyncTransform } from './transform.js';
import { LocalStorageAsyncMock } from './utils/localstorageAsync.js';
import { transaction1 } from './test/data.js';
import { State } from './state.js';
import { REDUX_ROOT } from './common.js';

function noMetaState(state: State) {
    const models = omit(state, ['@@_______REDUX_ORM_STATE_FLAG', '_persist']);
    const modelsNoMeta = mapValues(models, (x) => omit(x, ['meta']));
    return {
        ...modelsNoMeta,
        ['@@_______REDUX_ORM_STATE_FLAG']: state['@@_______REDUX_ORM_STATE_FLAG'],
        ['_persist']: state['_persist'],
    };
}

describe('redux-persist Integrated Test', () => {
    let localStorage: LocalStorageAsyncMock;
    let store: StoreType;
    let persistor: Persistor | undefined;

    beforeEach(() => {
        localStorage = new LocalStorageAsyncMock();
        ({ store, persistor } = createStore({ persistStorage: localStorage }));
    });

    describe('encode/decode', () => {
        it('Transaction', async () => {
            store.dispatch(createTransaction(transaction1));

            await persistor!.flush();

            const persistedString = await localStorage.getItem('persist:web3Redux');
            const persistedParsed = mapValues(JSON.parse(persistedString), (x) => JSON.parse(x));
            const persisted = noMetaState(persistedParsed as State);

            const stateParsed = store.getState().web3Redux;
            //Ignore Sync model
            stateParsed.Sync = {
                indexes: {},
                items: [],
                itemsById: {},
            };
            const state = noMetaState(stateParsed);
            assert.deepEqual(persisted, state);

            //Stored state using persistConfig
            const storedState = noMetaState(
                (await getStoredState({
                    key: REDUX_ROOT,
                    storage: localStorage,
                    transforms: [NetworkTransform, ContractTransform, SyncTransform],
                })) as State,
            );

            assert.deepEqual(storedState, state);
        });

        it('Network', async () => {
            store.dispatch(createNetwork({ networkId: '1336', web3Rpc: 'ws://localhost:8546' }));

            await persistor!.flush();
            const network1 = selectNetwork(store.getState(), '1336');
            assert.isDefined(network1?.web3);

            //Stored string
            const persistedString = await localStorage.getItem('persist:web3Redux');
            const persistedParsed = mapValues(JSON.parse(persistedString), (x) => JSON.parse(x)) as State;
            const network2 = persistedParsed.Network.itemsById['1336'];
            assert.isUndefined(network2?.web3);
        });
    });
});

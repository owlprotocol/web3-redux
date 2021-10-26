import { combineReducers, createStore as createReduxStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import crashReporter from './middleware/crashReporter';

import { Network } from './network/model';
import { BlockHeader } from './block/model';
import { Transaction } from './transaction/model';
import { Contract } from './contract/model';
import { ContractSend } from './contractsend/model';
import { EthCall } from './ethcall/model';
import { Account } from './account/model';

import { rootReducer } from './reducer';
import { rootSaga } from './saga';

export interface Web3ReduxStore {
    Network: {
        itemsById: {
            [id: string]: Network; //`${networkId}`
        };
    };
    Block: {
        itemsById: {
            [id: string]: BlockHeader; //`${networkId}-${number}`
        };
    };
    Transaction: {
        itemsById: {
            [id: string]: Transaction; //`${networkId}-${hash}`
        };
    };
    Contract: {
        itemsById: {
            [id: string]: Contract; //`${networkId}-${address}`
        };
    };
    ContractSend: {
        itemsById: {
            [id: string]: ContractSend; //`${networkId}-${address}-${methodName}(${args}).send(${from},${value})
        };
    };
    EthCall: {
        itemsById: {
            [id: string]: EthCall; //`${networkId}-${from}-${to}-${data}-${gas}`.
        };
    };
    Account: {
        itemsById: {
            [id: string]: Account; //`${networkId}-${address}`.
        };
    };
}

const reducers = combineReducers({
    web3Redux: rootReducer,
});

export const createStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createReduxStore(reducers, applyMiddleware(crashReporter, sagaMiddleware));
    sagaMiddleware.run(rootSaga);
    return store;
};

export default createStore();

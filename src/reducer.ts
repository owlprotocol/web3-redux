import { combineReducers } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import { persistReducer } from 'redux-persist';
import { WebStorage } from 'redux-persist/lib/types';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import { NetworkTransform, ContractTransform, SyncTransform } from './transform';
import isClient from './utils/isClient';
let defaultStorage: WebStorage;
if (isClient()) {
    defaultStorage = require('redux-persist/lib/storage');
} else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const localStorageMock = require('./test/localstorageAsync');
    defaultStorage = localStorageMock.getLocalStorageAsyncMock();
}

import { Action as NetworkAction, isReducerAction as isNetworkAction } from './network/actions';
import { Action as BlockAction, isReducerAction as isBlockAction } from './block/actions';
import { Action as TransactionAction, isReducerAction as isTransactionAction } from './transaction/actions';
import { Action as ContractAction, isReducerAction as isContractAction } from './contract/actions';
import { Action as ContractEventAction, isReducerAction as isContractEventAction } from './contractevent/actions';
import { Action as ContractSendAction, isReducerAction as isContractSendAction } from './contractsend/actions';
import { Action as EthCallAction, isReducerAction as isEthCallAction } from './ethcall/actions';
import { Action as ConfigAction, isReducerAction as isConfigAction } from './config/actions';
import { Action as Web3ReduxAction } from './web3Redux/actions';
import { Action as _4ByteAction, isReducerAction as is4ByteAction } from './4byte/actions';
import { Action as SyncAction, isReducerAction as isSyncAction } from './sync/actions';

import networkReducer from './network/reducer';
import blockReducer from './block/reducer';
import transactionReducer from './transaction/reducer';
import contractReducer from './contract/reducer';
import contractEventReducer from './contractevent/reducer';
import contractSendReducer from './contractsend/reducer';
import ethCallReducer from './ethcall/reducer';
import configReducer from './config/reducer';
import syncReducer from './sync/reducer';
import _4ByteReducer from './4byte/reducer';

import { getOrm, initializeState } from './orm';
import { REDUX_ROOT } from './common';

export type Action =
    | NetworkAction
    | BlockAction
    | TransactionAction
    | ContractAction
    | ContractEventAction
    | ContractSendAction
    | EthCallAction
    | ConfigAction
    | Web3ReduxAction
    | SyncAction
    | _4ByteAction;
export type Reducer = (state: any, action: any) => any;

export const reducerWeb3ReduxWithOrm = (state: any, action: Action) => {
    const orm = getOrm();
    const sess = orm.session(state || initializeState(orm));
    if (isNetworkAction(action)) networkReducer(sess, action);
    else if (isBlockAction(action)) blockReducer(sess, action);
    else if (isTransactionAction(action)) transactionReducer(sess, action);
    else if (isContractAction(action)) contractReducer(sess, action);
    else if (isContractEventAction(action)) contractEventReducer(sess, action);
    else if (isContractSendAction(action)) contractSendReducer(sess, action);
    else if (isEthCallAction(action)) ethCallReducer(sess, action);
    else if (isConfigAction(action)) configReducer(sess, action);
    else if (isSyncAction(action)) syncReducer(sess, action);
    else if (is4ByteAction(action)) _4ByteReducer(sess, action);

    return sess.state;
};

export const reducerWeb3ReduxWithBatching = enableBatching(reducerWeb3ReduxWithOrm as Reducer);

export const createReducerWeb3ReduxWithPersist = (storage: WebStorage) => {
    const persistConfig = {
        key: REDUX_ROOT,
        storage,
        transforms: [NetworkTransform, ContractTransform, SyncTransform],
        stateReconciler: hardSet,
        debug: true,
    };
    return persistReducer(persistConfig, reducerWeb3ReduxWithBatching);
};
export const reducerWeb3ReduxWithPersist = createReducerWeb3ReduxWithPersist(defaultStorage); //

export const createRootReducer = (reducerWeb3Redux: Reducer) => {
    return combineReducers({
        [REDUX_ROOT]: reducerWeb3Redux,
    });
};

export const rootReducer = createRootReducer(reducerWeb3ReduxWithBatching); //Default reducer has no persist
export const rootReducerWithPersist = createRootReducer(reducerWeb3ReduxWithPersist);

export default rootReducer;

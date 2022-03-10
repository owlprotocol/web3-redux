/* eslint-disable @typescript-eslint/no-var-requires */
import { combineReducers } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import { persistReducer } from 'redux-persist';
import { WebStorage } from 'redux-persist/lib/types';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import { NetworkTransform, ContractTransform, SyncTransform } from './transform.js';
import { isClient } from './utils/isClient.js';
import { Action as NetworkAction, isReducerAction as isNetworkAction } from './network/actions/index.js';
import { Action as BlockAction, isReducerAction as isBlockAction } from './block/actions/index.js';
import { Action as TransactionAction, isReducerAction as isTransactionAction } from './transaction/actions/index.js';
import { Action as ContractAction, isReducerAction as isContractAction } from './contract/actions/index.js';
import {
    Action as ContractEventAction,
    isReducerAction as isContractEventAction,
} from './contractevent/actions/index.js';
import { Action as ContractSendAction, isReducerAction as isContractSendAction } from './contractsend/actions/index.js';
import { Action as EthCallAction, isReducerAction as isEthCallAction } from './ethcall/actions/index.js';
import { Action as ConfigAction, isReducerAction as isConfigAction } from './config/actions/index.js';
import { Action as IpfsAction, isReducerAction as isIpfsAction } from './ipfs/actions/index.js';
import { Action as _4ByteAction, isReducerAction as is4ByteAction } from './4byte/actions/index.js';
import { Action as SyncAction, isReducerAction as isSyncAction } from './sync/actions/index.js';

import networkReducer from './network/reducer.js';
import blockReducer from './block/reducer.js';
import transactionReducer from './transaction/reducer.js';
import contractReducer from './contract/reducer.js';
import contractEventReducer from './contractevent/reducer.js';
import contractSendReducer from './contractsend/reducer.js';
import ethCallReducer from './ethcall/reducer.js';
import configReducer from './config/reducer.js';
import ipfsReducer from './ipfs/reducer.js';
import syncReducer from './sync/reducer.js';
import _4ByteReducer from './4byte/reducer.js';

import { getOrm, initializeState } from './orm.js';
import { REDUX_ROOT } from './common.js';

export type Action =
    | NetworkAction
    | BlockAction
    | TransactionAction
    | ContractAction
    | ContractEventAction
    | ContractSendAction
    | EthCallAction
    | ConfigAction
    | IpfsAction
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
    else if (isIpfsAction(action)) ipfsReducer(sess, action);
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
    return persistReducer(persistConfig as any, reducerWeb3ReduxWithBatching);
};

export const defaultLocalStorage = isClient()
    ? require('redux-persist/lib/storage').default
    : require('./utils/localstorageAsync').getLocalStorageAsyncMock();
export const reducerWeb3ReduxWithPersist = createReducerWeb3ReduxWithPersist(defaultLocalStorage); //

export const createRootReducer = (reducerWeb3Redux: Reducer) => {
    return combineReducers({
        [REDUX_ROOT]: reducerWeb3Redux,
    });
};

export const rootReducer = createRootReducer(reducerWeb3ReduxWithBatching); //Default reducer has no persist
export const rootReducerWithPersist = createRootReducer(reducerWeb3ReduxWithPersist);

export default rootReducer;

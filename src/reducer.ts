import { Action as NetworkAction, isReducerAction as isNetworkAction } from './network/actions';
import { Action as BlockAction, isReducerAction as isBlockAction } from './block/actions';
import * as TransactionActions from './transaction/actions';
import * as ContractActions from './contract/actions';
import { Action as ContractEventAction, isReducerAction as isContractEventAction } from './contractevent/actions';
import { Action as ContractSendAction, isReducerAction as isContractSendAction } from './contractsend/actions';
import { Action as EthCallAction, isReducerAction as isEthCallAction } from './ethcall/actions';
import { Action as ConfigAction, isReducerAction as isConfigAction } from './config/actions';
import * as Web3ReduxActions from './web3Redux/actions';
import { Action as AccountAction, isReducerAction as isAccountAction } from './account/actions';
import * as SyncActions from './sync/actions';
import networkReducer from './network/reducer';
import blockReducer from './block/reducer';
import transactionReducer from './transaction/reducer';
import contractReducer from './contract/reducer';
import contractEventReducer from './contractevent/reducer';
import contractSendReducer from './contractsend/reducer';
import ethCallReducer from './ethcall/reducer';
import configReducer from './config/reducer';
import accountReducer from './account/reducer';
import syncReducer from './sync/reducer';

import { getOrm, initializeState } from './orm';

export type Action =
    | NetworkAction
    | BlockAction
    | TransactionActions.Action
    | ContractActions.Action
    | ContractEventAction
    | ContractSendAction
    | EthCallAction
    | ConfigAction
    | Web3ReduxActions.Action
    | AccountAction
    | SyncActions.Action;

export function rootReducer(state: any, action: Action) {
    const orm = getOrm();
    const sess = orm.session(state || initializeState(orm));
    if (isNetworkAction(action)) networkReducer(sess, action);
    else if (isBlockAction(action)) blockReducer(sess, action);
    else if (TransactionActions.isReducerAction(action)) transactionReducer(sess, action);
    else if (ContractActions.isReducerAction(action)) contractReducer(sess, action);
    else if (isContractEventAction(action)) contractEventReducer(sess, action);
    else if (isContractSendAction(action)) contractSendReducer(sess, action);
    else if (isEthCallAction(action)) ethCallReducer(sess, action);
    else if (isConfigAction(action)) configReducer(sess, action);
    else if (isAccountAction(action)) accountReducer(sess, action);
    else if (SyncActions.isReducerAction(action)) syncReducer(sess, action);

    return sess.state;
}

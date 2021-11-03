import * as NetworkActions from './network/actions';
import { Action as BlockAction, isReducerAction as isBlockAction } from './block/actions';
import * as TransactionActions from './transaction/actions';
import * as ContractActions from './contract/actions';
import { Action as ContractEventAction, isReducerAction as isContractEventAction } from './contractevent/actions';
import { Action as ContractSendAction, isReducerAction as isContractSendAction } from './contractsend/actions';
import * as EthCallActions from './ethcall/actions';
import { Action as ConfigAction, isReducerAction as isConfigAction } from './config/actions';
import * as Web3ReduxActions from './web3Redux/actions';
import { Action as AccountAction, isReducerAction as isAccountAction } from './account/actions';
import * as SyncActions from './sync/actions';
import { reducer as networkReducer } from './network/reducer';
import blockReducer from './block/reducer';
import { reducer as transactionReducer } from './transaction/reducer';
import { reducer as contractReducer } from './contract/reducer';
import contractEventReducer from './contractevent/reducer';
import contractSendReducer from './contractsend/reducer';
import { reducer as ethCallReducer } from './ethcall/reducer';
import configReducer from './config/reducer';
import accountReducer from './account/reducer';
import { reducer as syncReducer } from './sync/reducer';

import { orm, initializeState } from './orm';

export type Action =
    | NetworkActions.Action
    | BlockAction
    | TransactionActions.Action
    | ContractActions.Action
    | ContractEventAction
    | ContractSendAction
    | EthCallActions.Action
    | ConfigAction
    | Web3ReduxActions.Action
    | AccountAction
    | SyncActions.Action;

export function rootReducer(state: any, action: Action) {
    const sess = orm.session(state || initializeState(orm));
    if (NetworkActions.isReducerAction(action)) networkReducer(sess, action);
    else if (isBlockAction(action)) blockReducer(sess, action);
    else if (TransactionActions.isReducerAction(action)) transactionReducer(sess, action);
    else if (ContractActions.isReducerAction(action)) contractReducer(sess, action);
    else if (isContractEventAction(action)) contractEventReducer(sess, action);
    else if (isContractSendAction(action)) contractSendReducer(sess, action);
    else if (EthCallActions.isReducerAction(action)) ethCallReducer(sess, action);
    else if (isConfigAction(action)) configReducer(sess, action);
    else if (isAccountAction(action)) accountReducer(sess, action);
    else if (SyncActions.isReducerAction(action)) syncReducer(sess, action);

    return sess.state;
}

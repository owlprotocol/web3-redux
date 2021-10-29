import * as NetworkActions from './network/actions';
import * as BlockActions from './block/actions';
import * as TransactionActions from './transaction/actions';
import * as ContractActions from './contract/actions';
import * as ContractEventActions from './contractevent/actions';
import * as ContractSendActions from './contractsend/actions';
import * as EthCallActions from './ethcall/actions';
import * as ConfigActions from './config/actions';
import * as Web3ReduxActions from './web3Redux/actions';
import { Action as AccountAction, isReducerAction as isAccountAction } from './account/actions';
import * as SyncActions from './sync/actions';
import { reducer as networkReducer } from './network/reducer';
import { reducer as blockReducer } from './block/reducer';
import { reducer as transactionReducer } from './transaction/reducer';
import { reducer as contractReducer } from './contract/reducer';
import { reducer as contractEventReducer } from './contractevent/reducer';
import { reducer as contractSendReducer } from './contractsend/reducer';
import { reducer as ethCallReducer } from './ethcall/reducer';
import { reducer as configReducer } from './config/reducer';
import accountReducer from './account/reducer';
import { reducer as syncReducer } from './sync/reducer';

import { orm, initializeState } from './orm';

export type Action =
    | NetworkActions.Action
    | BlockActions.Action
    | TransactionActions.Action
    | ContractActions.Action
    | ContractEventActions.Action
    | ContractSendActions.Action
    | EthCallActions.Action
    | ConfigActions.Action
    | Web3ReduxActions.Action
    | AccountAction
    | SyncActions.Action;

export function rootReducer(state: any, action: Action) {
    const sess = orm.session(state || initializeState(orm));
    if (NetworkActions.isReducerAction(action)) networkReducer(sess, action);
    else if (BlockActions.isReducerAction(action)) blockReducer(sess, action);
    else if (TransactionActions.isReducerAction(action)) transactionReducer(sess, action);
    else if (ContractActions.isReducerAction(action)) contractReducer(sess, action);
    else if (ContractEventActions.isReducerAction(action)) contractEventReducer(sess, action);
    else if (ContractSendActions.isReducerAction(action)) contractSendReducer(sess, action);
    else if (EthCallActions.isReducerAction(action)) ethCallReducer(sess, action);
    else if (ConfigActions.isReducerAction(action)) configReducer(sess, action);
    else if (isAccountAction(action)) accountReducer(sess, action);
    else if (SyncActions.isReducerAction(action)) syncReducer(sess, action);

    return sess.state;
}

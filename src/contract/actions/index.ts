import { CREATE, create, CreateAction, isCreateAction } from './create';
import { REMOVE, remove, RemoveAction, isRemoveAction } from './remove';
import { UPDATE, update, UpdateAction, isUpdateAction } from './update';
import { SET, set, SetAction, isSetAction } from './set';
import { CALL, call, CallAction, isCallAction } from './call';
import { CALL_BATCHED, callBatched, CallBatchedAction, isCallBatchedAction } from './callBatched';
import { CALL_SYNCED, callSynced, CallSyncedAction, isCallSyncedAction } from './callSynced';
import { SEND, send, SendAction, isSendAction } from './send';
import { EVENT_GET_PAST, eventGetPast, EventGetPastAction, isEventGetPastAction } from './eventGetPast';
import { EVENT_SUBSCRIBE, eventSubscribe, EventSubscribeAction, isEventSubscribeAction } from './eventSubscribe';
import {
    EVENT_UNSUBSCRIBE,
    eventUnsubscribe,
    EventUnsubscribeAction,
    isEventUnsubscribeAction,
} from './eventUnsubscribe';
import { FETCH_ABI, fetchAbi, FetchAbiAction, isFetchAbiAction } from './fetchAbi';
import { GET_BALANCE, getBalance, GetBalanceAction, isGetBalanceAction } from './getBalance';
import { GET_NONCE, getNonce, GetNonceAction, isGetNonceAction } from './getNonce';
import {
    FETCH_TRANSACTIONS,
    fetchTransactions,
    FetchTransactionsAction,
    isFetchTransactionsAction,
} from './fetchTransactions';
import {
    GET_BALANCE_SYNCED,
    getBalanceSynced,
    GetBalanceSyncedAction,
    isGetBalanceSyncedAction,
} from './getBalanceSynced';
import { GET_NONCE_SYNCED, getNonceSynced, GetNonceSyncedAction, isGetNonceSyncedAction } from './getNonceSynced';
import { GET_CODE, getCode, GetCodeAction, isGetCodeAction } from './getCode';

/** @internal */
export type ReducerAction = CreateAction | RemoveAction | UpdateAction | SetAction;
/** @internal */
export function isReducerAction(action: { type: string }): action is ReducerAction {
    return isCreateAction(action) || isRemoveAction(action) || isUpdateAction(action) || isSetAction(action);
}

/** @internal */
export type SagaAction =
    | CallAction
    | CallBatchedAction
    | CallSyncedAction
    | SendAction
    | EventGetPastAction
    | EventSubscribeAction
    | EventUnsubscribeAction
    | FetchAbiAction
    | GetBalanceAction
    | GetNonceAction
    | FetchTransactionsAction
    | GetBalanceSyncedAction
    | GetNonceSyncedAction
    | GetCodeAction;
/** @internal */
export function isSagaAction(action: { type: string }): action is SagaAction {
    return (
        isCallAction(action) ||
        isCallBatchedAction(action) ||
        isCallSyncedAction(action) ||
        isSendAction(action) ||
        isEventGetPastAction(action) ||
        isEventSubscribeAction(action) ||
        isEventUnsubscribeAction(action) ||
        isFetchAbiAction(action) ||
        isGetBalanceAction(action) ||
        isGetNonceAction(action) ||
        isFetchTransactionsAction(action) ||
        isGetBalanceSyncedAction(action) ||
        isGetNonceSyncedAction(action) ||
        isGetCodeAction(action)
    );
}

/** @internal */
export type Action = ReducerAction | SagaAction;
/** @internal */
export function isAction(action: { type: string }): action is Action {
    return isReducerAction(action) || isSagaAction(action);
}

export type {
    CreateAction,
    RemoveAction,
    UpdateAction,
    SetAction,
    CallAction,
    CallSyncedAction,
    CallBatchedAction,
    SendAction,
    EventGetPastAction,
    EventSubscribeAction,
    EventUnsubscribeAction,
    FetchAbiAction,
    GetBalanceAction,
    GetNonceAction,
    FetchTransactionsAction,
    GetBalanceSyncedAction,
    GetNonceSyncedAction,
    GetCodeAction,
};

export {
    CREATE,
    create,
    isCreateAction,
    REMOVE,
    remove,
    isRemoveAction,
    UPDATE,
    update,
    isUpdateAction,
    SET,
    set,
    isSetAction,
    CALL,
    call,
    isCallAction,
    CALL_SYNCED,
    callSynced,
    isCallSyncedAction,
    CALL_BATCHED,
    callBatched,
    isCallBatchedAction,
    SEND,
    send,
    isSendAction,
    EVENT_GET_PAST,
    eventGetPast,
    isEventGetPastAction,
    EVENT_SUBSCRIBE,
    eventSubscribe,
    isEventSubscribeAction,
    EVENT_UNSUBSCRIBE,
    eventUnsubscribe,
    isEventUnsubscribeAction,
    FETCH_ABI,
    fetchAbi,
    isFetchAbiAction,
    GET_BALANCE as FETCH_BALANCE,
    getBalance as fetchBalance,
    isGetBalanceAction as isFetchBalanceAction,
    GET_NONCE as FETCH_NONCE,
    getNonce as fetchNonce,
    isGetNonceAction as isFetchNonceAction,
    FETCH_TRANSACTIONS,
    fetchTransactions,
    isFetchTransactionsAction,
    GET_BALANCE_SYNCED as FETCH_BALANCE_SYNCED,
    getBalanceSynced as fetchBalanceSynced,
    isGetBalanceSyncedAction as isFetchBalanceSyncedAction,
    GET_NONCE_SYNCED as FETCH_NONCE_SYNCED,
    getNonceSynced as fetchNonceSynced,
    isGetNonceSyncedAction as isFetchNonceSyncedAction,
    GET_CODE,
    getCode,
    isGetCodeAction,
};

export default {
    CREATE,
    create,
    isCreateAction,
    REMOVE,
    remove,
    isRemoveAction,
    UPDATE,
    update,
    isUpdateAction,
    SET,
    set,
    isSetAction,
    CALL,
    call,
    isCallAction,
    CALL_SYNCED,
    callSynced,
    isCallSyncedAction,
    CALL_BATCHED,
    callBatched,
    isCallBatchedAction,
    SEND,
    send,
    isSendAction,
    EVENT_GET_PAST,
    eventGetPast,
    isEventGetPastAction,
    EVENT_SUBSCRIBE,
    eventSubscribe,
    isEventSubscribeAction,
    EVENT_UNSUBSCRIBE,
    eventUnsubscribe,
    isEventUnsubscribeAction,
    FETCH_ABI,
    fetchAbi,
    isFetchAbiAction,
    FETCH_BALANCE: GET_BALANCE,
    fetchBalance: getBalance,
    isFetchBalanceAction: isGetBalanceAction,
    FETCH_NONCE: GET_NONCE,
    fetchNonce: getNonce,
    isFetchNonceAction: isGetNonceAction,
    FETCH_TRANSACTIONS,
    fetchTransactions,
    isFetchTransactionsAction,
    FETCH_BALANCE_SYNCED: GET_BALANCE_SYNCED,
    fetchBalanceSynced: getBalanceSynced,
    isFetchBalanceSyncedAction: isGetBalanceSyncedAction,
    FETCH_NONCE_SYNCED: GET_NONCE_SYNCED,
    fetchNonceSynced: getNonceSynced,
    isFetchNonceSyncedAction: isGetNonceSyncedAction,
    GET_CODE,
    getCode,
    isGetCodeAction,
};

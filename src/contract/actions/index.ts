import { CREATE, create, CreateAction, isCreateAction } from './create';
import { REMOVE, remove, RemoveAction, isRemoveAction } from './remove';
import { UPDATE, update, UpdateAction, isUpdateAction } from './update';
import { SET, set, SetAction, isSetAction } from './set';
import { CALL, call, CallAction, isCallAction } from './call';
import { CALL_BATCHED, callBatched, CallBatchedAction, isCallBatchedAction } from './callBatched';
import { CALL_SYNCED, callSynced, CallSyncedAction, isCallSyncedAction } from './callSynced';
import { CALL_UNSYNC, callUnsync, CallUnsyncAction, isCallUnsyncAction } from './callUnsync';
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
import {
    FETCH_BALANCE,
    fetchBalance,
    FetchBalanceAction,
    isFetchBalanceAction,
} from '../../contract/actions/fetchBalance';
import { FETCH_NONCE, fetchNonce, FetchNonceAction, isFetchNonceAction } from './fetchNonce';
import {
    FETCH_TRANSACTIONS,
    fetchTransactions,
    FetchTransactionsAction,
    isFetchTransactionsAction,
} from './fetchTransactions';
import {
    FETCH_BALANCE_SYNCED,
    fetchBalanceSynced,
    FetchBalanceSyncedAction,
    isFetchBalanceSyncedAction,
} from './fetchBalanceSynced';
import {
    FETCH_NONCE_SYNCED,
    fetchNonceSynced,
    FetchNonceSyncedAction,
    isFetchNonceSyncedAction,
} from './fetchNonceSynced';
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
    | CallUnsyncAction
    | SendAction
    | EventGetPastAction
    | EventSubscribeAction
    | EventUnsubscribeAction
    | FetchAbiAction
    | FetchBalanceAction
    | FetchNonceAction
    | FetchTransactionsAction
    | FetchBalanceSyncedAction
    | FetchNonceSyncedAction
    | GetCodeAction;
/** @internal */
export function isSagaAction(action: { type: string }): action is SagaAction {
    return (
        isCallAction(action) ||
        isCallBatchedAction(action) ||
        isCallSyncedAction(action) ||
        isCallUnsyncAction(action) ||
        isSendAction(action) ||
        isEventGetPastAction(action) ||
        isEventSubscribeAction(action) ||
        isEventUnsubscribeAction(action) ||
        isFetchAbiAction(action) ||
        isFetchBalanceAction(action) ||
        isFetchNonceAction(action) ||
        isFetchTransactionsAction(action) ||
        isFetchBalanceSyncedAction(action) ||
        isFetchNonceSyncedAction(action) ||
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
    CallUnsyncAction,
    CallBatchedAction,
    SendAction,
    EventGetPastAction,
    EventSubscribeAction,
    EventUnsubscribeAction,
    FetchAbiAction,
    FetchBalanceAction,
    FetchNonceAction,
    FetchTransactionsAction,
    FetchBalanceSyncedAction,
    FetchNonceSyncedAction,
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
    CALL_UNSYNC,
    callUnsync,
    isCallUnsyncAction,
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
    FETCH_BALANCE,
    fetchBalance,
    isFetchBalanceAction,
    FETCH_NONCE,
    fetchNonce,
    isFetchNonceAction,
    FETCH_TRANSACTIONS,
    fetchTransactions,
    isFetchTransactionsAction,
    FETCH_BALANCE_SYNCED,
    fetchBalanceSynced,
    isFetchBalanceSyncedAction,
    FETCH_NONCE_SYNCED,
    fetchNonceSynced,
    isFetchNonceSyncedAction,
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
    CALL_UNSYNC,
    callUnsync,
    isCallUnsyncAction,
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
    FETCH_BALANCE,
    fetchBalance,
    isFetchBalanceAction,
    FETCH_NONCE,
    fetchNonce,
    isFetchNonceAction,
    FETCH_TRANSACTIONS,
    fetchTransactions,
    isFetchTransactionsAction,
    FETCH_BALANCE_SYNCED,
    fetchBalanceSynced,
    isFetchBalanceSyncedAction,
    FETCH_NONCE_SYNCED,
    fetchNonceSynced,
    isFetchNonceSyncedAction,
    GET_CODE,
    getCode,
    isGetCodeAction,
};

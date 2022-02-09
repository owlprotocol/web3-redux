import { CREATE, create, CreateAction, isCreateAction } from './create';
import { REMOVE, remove, RemoveAction, isRemoveAction } from './remove';
import { UPDATE, update, UpdateAction, isUpdateAction } from './update';
import { SET, set, SetAction, isSetAction } from './set';
import { CALL, call, CallAction, isCallAction } from './call';
import { CALL_BATCHED, callBatched, CallBatchedAction, isCallBatchedAction } from './callBatched';
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
import { GET_CODE, getCode, GetCodeAction, isGetCodeAction } from './getCode';
import { GET_ENS, getEns, GetEnsAction, isGetEnsAction } from './getEns';

/* Synced composite actions */
export { callSynced } from './callSynced';
export { getBalanceSynced } from './getBalanceSynced';
export { getNonceSynced } from './getNonceSynced';

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
    | GetCodeAction
    | GetEnsAction
    | GetCodeAction;

/** @internal */
export function isSagaAction(action: { type: string }): action is SagaAction {
    return (
        isCallAction(action) ||
        isCallBatchedAction(action) ||
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
        isGetCodeAction(action) ||
        isGetEnsAction(action) ||
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
    CallBatchedAction,
    SendAction,
    EventGetPastAction,
    EventSubscribeAction,
    EventUnsubscribeAction,
    FetchAbiAction,
    GetBalanceAction,
    GetNonceAction,
    FetchTransactionsAction,
    GetCodeAction,
    GetEnsAction,
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
    GET_BALANCE,
    getBalance,
    isGetBalanceAction,
    GET_NONCE,
    getNonce,
    isGetNonceAction,
    FETCH_TRANSACTIONS,
    fetchTransactions,
    isFetchTransactionsAction,
    GET_CODE,
    getCode,
    isGetCodeAction,
    GET_ENS,
    getEns,
    isGetEnsAction,
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
    GET_BALANCE,
    getBalance,
    isGetBalanceAction,
    GET_NONCE,
    getNonce,
    isGetNonceAction,
    FETCH_TRANSACTIONS,
    fetchTransactions,
    isFetchTransactionsAction,
    GET_CODE,
    getCode,
    isGetCodeAction,
    GET_ENS,
    getEns,
    isGetEnsAction,
};

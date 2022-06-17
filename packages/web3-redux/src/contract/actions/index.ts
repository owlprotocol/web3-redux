import {
    CREATE,
    createAction,
    CreateAction,
    isCreateAction,
    CREATE_BATCHED,
    createBatchedAction,
    CreateBatchedAction,
    isCreateBatchedAction,
    CREATE_DB,
    createDBAction,
    CreateDBAction,
    isCreateDBAction,
    CREATE_DB_BATCHED,
    createDBBatchedAction,
    CreateDBBatchedAction,
    isCreateDBBatchedAction,
} from './create/index.js';
import {
    REMOVE,
    removeAction,
    RemoveAction,
    isRemoveAction,
    REMOVE_BATCHED,
    removeBatchedAction,
    RemoveBatchedAction,
    isRemoveBatchedAction,
    REMOVE_DB,
    removeDBAction,
    RemoveDBAction,
    isRemoveDBAction,
    REMOVE_DB_BATCHED,
    removeDBBatchedAction,
    RemoveDBBatchedAction,
    isRemoveDBBatchedAction,
} from './remove/index.js';
import {
    UPDATE,
    updateAction,
    UpdateAction,
    isUpdateAction,
    UPDATE_BATCHED,
    updateBatchedAction,
    UpdateBatchedAction,
    isUpdateBatchedAction,
    UPDATE_DB,
    updateDBAction,
    UpdateDBAction,
    isUpdateDBAction,
    UPDATE_DB_BATCHED,
    updateDBBatchedAction,
    UpdateDBBatchedAction,
    isUpdateDBBatchedAction,
} from './update/index.js';

import { LOAD_DB_ALL, loadDBAllAction, LoadDBAllAction, isLoadDBAllAction } from './loadDBAll.js';
import { SET, set, SetAction, isSetAction } from './set.js';
import { CALL, call, CallAction, isCallAction } from './call.js';
import { CALL_BATCHED, callBatched, CallBatchedAction, isCallBatchedAction } from './callBatched.js';
import { SEND, send, SendAction, isSendAction } from './send.js';
import { EVENT_GET_PAST, eventGetPast, EventGetPastAction, isEventGetPastAction } from './eventGetPast.js';
import {
    EVENT_GET_PAST_RAW,
    eventGetPastRaw,
    EventGetPastRawAction,
    isEventGetPastRawAction,
} from './eventGetPastRaw.js';
import { EVENT_SUBSCRIBE, eventSubscribe, EventSubscribeAction, isEventSubscribeAction } from './eventSubscribe.js';
import {
    EVENT_UNSUBSCRIBE,
    eventUnsubscribe,
    EventUnsubscribeAction,
    isEventUnsubscribeAction,
} from './eventUnsubscribe.js';
import { FETCH_ABI, fetchAbi, FetchAbiAction, isFetchAbiAction } from './fetchAbi.js';
import { GET_BALANCE, getBalance, GetBalanceAction, isGetBalanceAction } from './getBalance.js';
import { GET_NONCE, getNonce, GetNonceAction, isGetNonceAction } from './getNonce.js';
import {
    FETCH_TRANSACTIONS,
    fetchTransactions,
    FetchTransactionsAction,
    isFetchTransactionsAction,
} from './fetchTransactions.js';
import { GET_CODE, getCode, GetCodeAction, isGetCodeAction } from './getCode.js';
import { GET_ENS, getEns, GetEnsAction, isGetEnsAction } from './getEns.js';

/* Synced composite actions */
export { callSynced } from './callSynced.js';
export { getBalanceSynced } from './getBalanceSynced.js';
export { getNonceSynced } from './getNonceSynced.js';

/** @internal */
export type ReducerAction =
    | CreateAction
    | CreateBatchedAction
    | RemoveAction
    | RemoveBatchedAction
    | UpdateAction
    | UpdateBatchedAction
    | SetAction;
/** @internal */
export function isReducerAction(action: { type: string }): action is ReducerAction {
    return (
        isCreateAction(action) ||
        isCreateBatchedAction(action) ||
        isRemoveAction(action) ||
        isRemoveBatchedAction(action) ||
        isUpdateAction(action) ||
        isUpdateBatchedAction(action) ||
        isSetAction(action)
    );
}

/** @internal */
export type SagaAction =
    | CreateDBAction
    | CreateDBBatchedAction
    | RemoveAction
    | RemoveBatchedAction
    | UpdateAction
    | UpdateDBAction
    | LoadDBAllAction
    | CallAction
    | CallBatchedAction
    | SendAction
    | EventGetPastAction
    | EventGetPastRawAction
    | EventSubscribeAction
    | EventUnsubscribeAction
    | FetchAbiAction
    | GetBalanceAction
    | GetNonceAction
    | FetchTransactionsAction
    | GetCodeAction
    | GetEnsAction
    | GetCodeAction;

/** @internal */
export function isSagaAction(action: { type: string }): action is SagaAction {
    return (
        isCreateDBAction(action) ||
        isCreateDBBatchedAction(action) ||
        isRemoveDBAction(action) ||
        isRemoveDBBatchedAction(action) ||
        isUpdateDBAction(action) ||
        isUpdateDBBatchedAction(action) ||
        isLoadDBAllAction(action) ||
        isCallAction(action) ||
        isCallBatchedAction(action) ||
        isSendAction(action) ||
        isEventGetPastAction(action) ||
        isEventGetPastRawAction(action) ||
        isEventSubscribeAction(action) ||
        isEventUnsubscribeAction(action) ||
        isFetchAbiAction(action) ||
        isGetBalanceAction(action) ||
        isGetNonceAction(action) ||
        isFetchTransactionsAction(action) ||
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
    CreateBatchedAction,
    CreateDBAction,
    CreateDBBatchedAction,
    RemoveAction,
    RemoveBatchedAction,
    RemoveDBAction,
    RemoveDBBatchedAction,
    UpdateAction,
    UpdateBatchedAction,
    UpdateDBAction,
    UpdateDBBatchedAction,
};

export type {
    LoadDBAllAction,
    SetAction,
    CallAction,
    CallBatchedAction,
    SendAction,
    EventGetPastAction,
    EventGetPastRawAction,
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
    createAction,
    isCreateAction,
    CREATE_BATCHED,
    createBatchedAction,
    isCreateBatchedAction,
    CREATE_DB,
    createDBAction,
    isCreateDBAction,
    CREATE_DB_BATCHED,
    createDBBatchedAction,
    isCreateDBBatchedAction,
    REMOVE,
    removeAction,
    isRemoveAction,
    REMOVE_BATCHED,
    removeBatchedAction,
    isRemoveBatchedAction,
    REMOVE_DB,
    removeDBAction,
    isRemoveDBAction,
    REMOVE_DB_BATCHED,
    removeDBBatchedAction,
    isRemoveDBBatchedAction,
    UPDATE,
    updateAction,
    isUpdateAction,
    UPDATE_BATCHED,
    updateBatchedAction,
    isUpdateBatchedAction,
    UPDATE_DB,
    updateDBAction,
    isUpdateDBAction,
    UPDATE_DB_BATCHED,
    updateDBBatchedAction,
    isUpdateDBBatchedAction,
};

export {
    LOAD_DB_ALL,
    loadDBAllAction,
    isLoadDBAllAction,
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
    EVENT_GET_PAST_RAW,
    eventGetPastRaw,
    isEventGetPastRawAction,
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

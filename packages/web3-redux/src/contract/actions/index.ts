import { CREATE, create, CreateAction, isCreateAction } from './create.js';
import { CREATE_BATCHED, createBatchedAction, CreateBatchedAction, isCreateBatchedAction } from './createBatched.js';
import { CREATE_DB, createDBAction, CreateDBAction, isCreateDBAction } from './createDB.js';
import {
    CREATE_DB_BATCHED,
    createDBBatchedAction,
    CreateDBBatchedAction,
    isCreateDBBatchedAction,
} from './createDBBatched.js';
import { LOAD_DB_ALL, loadDBAllAction, LoadDBAllAction, isLoadDBAllAction } from './loadDBAll.js';
import { REMOVE, remove, RemoveAction, isRemoveAction } from './remove.js';
import { UPDATE, update, UpdateAction, isUpdateAction } from './update.js';
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
export type ReducerAction = CreateAction | CreateBatchedAction | RemoveAction | UpdateAction | SetAction;
/** @internal */
export function isReducerAction(action: { type: string }): action is ReducerAction {
    return (
        isCreateAction(action) ||
        isCreateBatchedAction(action) ||
        isRemoveAction(action) ||
        isUpdateAction(action) ||
        isSetAction(action)
    );
}

/** @internal */
export type SagaAction =
    | CreateDBAction
    | CreateDBBatchedAction
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
    LoadDBAllAction,
    RemoveAction,
    UpdateAction,
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
    create,
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
    LOAD_DB_ALL,
    loadDBAllAction,
    isLoadDBAllAction,
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

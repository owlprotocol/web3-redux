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
import { GET_PAST_LOGS, getPastLogs, GetPastLogsAction, isGetPastLogsAction } from './getPastLogs.js';
import { SUBSCRIBE_LOGS, subscribeLogs, SubscribeLogsAction, isSubscribeLogsAction } from './subscribeLogs.js';
import {
    UNSUBSCRIBE_LOGS,
    unsubscribeLogs,
    UnsubscribeLogsAction,
    isUnsubscribeLogsAction,
} from './unsubscribeLogs.js';
import { GET_ASSETS, getAssets, GetAssetsAction, isGetAssetsAction } from './getAssets.js';

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
    | GetPastLogsAction
    | SubscribeLogsAction
    | UnsubscribeLogsAction
    | GetAssetsAction;
/** @internal */
export function isSagaAction(action: { type: string }): action is SagaAction {
    return (
        isCreateDBAction(action) ||
        isCreateDBBatchedAction(action) ||
        isLoadDBAllAction(action) ||
        isGetPastLogsAction(action) ||
        isSubscribeLogsAction(action) ||
        isUnsubscribeLogsAction(action) ||
        isGetAssetsAction(action)
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
    GetPastLogsAction,
    SubscribeLogsAction,
    UnsubscribeLogsAction,
    GetAssetsAction,
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
    GET_PAST_LOGS,
    getPastLogs,
    isGetPastLogsAction,
    SUBSCRIBE_LOGS,
    subscribeLogs,
    isSubscribeLogsAction,
    UNSUBSCRIBE_LOGS,
    unsubscribeLogs,
    isUnsubscribeLogsAction,
    GET_ASSETS,
    getAssets,
    isGetAssetsAction,
};

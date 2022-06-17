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
import { HTTP_GET, httpGet, HttpGetAction, isHttpGetAction } from './httpGet.js';

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
export type SagaAction = CreateDBAction | CreateDBBatchedAction | LoadDBAllAction | HttpGetAction;

/** @internal */
export function isSagaAction(action: { type: string }): action is SagaAction {
    return (
        isCreateDBAction(action) ||
        isCreateDBBatchedAction(action) ||
        isLoadDBAllAction(action) ||
        isHttpGetAction(action)
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
    HttpGetAction,
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
    HTTP_GET,
    httpGet,
    isHttpGetAction,
};
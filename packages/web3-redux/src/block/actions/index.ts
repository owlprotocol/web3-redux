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
import { FETCH, fetch, FetchAction, isFetchAction } from './fetch.js';
import { SUBSCRIBE, subscribe, SubscribeAction, isSubscribeAction } from './subscribe.js';
import { UNSUBSCRIBE, unsubscribe, UnsubscribeAction, isUnsubscribeAction } from './unsubscribe.js';

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
    | FetchAction
    | SubscribeAction
    | UnsubscribeAction;
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
        isFetchAction(action) ||
        isSagaAction(action) ||
        isUnsubscribeAction(action)
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
    LoadDBAllAction,
    SetAction,
    FetchAction,
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
    FETCH,
    fetch,
    isFetchAction,
    SUBSCRIBE,
    subscribe,
    isSubscribeAction,
    UNSUBSCRIBE,
    unsubscribe,
    isUnsubscribeAction,
};

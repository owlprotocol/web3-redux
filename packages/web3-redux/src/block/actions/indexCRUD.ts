import {
    CREATE,
    createAction,
    CreateAction,
    isCreateAction,
    CREATE_BATCHED,
    createBatchedAction,
    CreateBatchedAction,
    isCreateBatchedAction,
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
} from './update/index.js';

/** @internal */
export type CRUDAction =
    | CreateAction
    | CreateBatchedAction
    | RemoveAction
    | RemoveBatchedAction
    | UpdateAction
    | UpdateBatchedAction;
/** @internal */
export function isCRUDAction(action: { type: string }): action is CRUDAction {
    return (
        isCreateAction(action) ||
        isCreateBatchedAction(action) ||
        isRemoveAction(action) ||
        isRemoveBatchedAction(action) ||
        isUpdateAction(action) ||
        isUpdateBatchedAction(action)
    );
}

export type { CreateAction, CreateBatchedAction, RemoveAction, RemoveBatchedAction, UpdateAction, UpdateBatchedAction };

export {
    CREATE,
    createAction,
    isCreateAction,
    CREATE_BATCHED,
    createBatchedAction,
    isCreateBatchedAction,
    REMOVE,
    removeAction,
    isRemoveAction,
    REMOVE_BATCHED,
    removeBatchedAction,
    isRemoveBatchedAction,
    UPDATE,
    updateAction,
    isUpdateAction,
    UPDATE_BATCHED,
    updateBatchedAction,
    isUpdateBatchedAction,
};

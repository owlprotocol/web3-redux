import { CREATE, create, CreateAction, isCreateAction } from './create.js';
import { REMOVE, remove, RemoveAction, isRemoveAction } from './remove.js';
import { UPDATE, update, UpdateAction, isUpdateAction } from './update.js';
import { SET, set, SetAction, isSetAction } from './set.js';
import { FETCH, fetch, FetchAction, isFetchAction } from './fetch.js';

export type ReducerAction = CreateAction | RemoveAction | UpdateAction | SetAction;
export function isReducerAction(action: { type: string }): action is ReducerAction {
    return isCreateAction(action) || isRemoveAction(action) || isUpdateAction(action) || isSetAction(action);
}

export type SagaAction = FetchAction;
export function isSagaAction(action: { type: string }): action is SagaAction {
    return isSagaAction(action);
}

export type Action = ReducerAction;
export function isAction(action: { type: string }): action is Action {
    return isReducerAction(action);
}

export type { CreateAction, RemoveAction, UpdateAction, SetAction, FetchAction };

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
    FETCH,
    fetch,
    isFetchAction,
};

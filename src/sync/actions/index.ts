import { CREATE, create, CreateAction, isCreateAction } from './create';
import { REMOVE, remove, RemoveAction, isRemoveAction } from './remove';
import { UPDATE, update, UpdateAction, isUpdateAction } from './update';

/** @internal */
export type ReducerAction = CreateAction | RemoveAction | UpdateAction;
/** @internal */
export function isReducerAction(action: { type: string }): action is ReducerAction {
    return isCreateAction(action) || isRemoveAction(action) || isUpdateAction(action);
}

/** @internal */
export type Action = ReducerAction;
/** @internal */
export function isAction(action: { type: string }): action is Action {
    return isReducerAction(action);
}

export type { CreateAction, RemoveAction, UpdateAction };

export { CREATE, create, isCreateAction, REMOVE, remove, isRemoveAction, UPDATE, update, isUpdateAction };

import { CREATE, create, CreateAction, isCreateAction } from './create';
import { REMOVE, remove, RemoveAction, isRemoveAction } from './remove';

export type ReducerAction = CreateAction | RemoveAction;
export function isReducerAction(action: { type: string }): action is ReducerAction {
    return isCreateAction(action) || isRemoveAction(action);
}

export type Action = ReducerAction;
export function isAction(action: { type: string }): action is Action {
    return isReducerAction(action);
}

export { CREATE, create, CreateAction, isCreateAction, REMOVE, remove, RemoveAction, isRemoveAction };

import { createAction } from '@reduxjs/toolkit';
import { Account } from './model';

const name = 'Account';

export const CREATE = `${name}/CREATE`;
export const REMOVE = `${name}/DELETE`;

export const create = createAction<Account>(CREATE);
export const remove = createAction<string>(REMOVE);

export type CreateAction = ReturnType<typeof create>;
export const isCreateAction = create.match;

export type RemoveAction = ReturnType<typeof remove>;
export const isRemoveAction = remove.match;

export type ReducerAction = CreateAction | RemoveAction;
export function isReducerAction(action: { type: string }): action is ReducerAction {
    return isCreateAction(action) || isRemoveAction(action);
}

export type Action = ReducerAction;
export function isAction(action: { type: string }): action is Action {
    return isReducerAction(action);
}

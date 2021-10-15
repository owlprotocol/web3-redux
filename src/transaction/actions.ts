import { createAction } from '@reduxjs/toolkit';
import { Transaction, TransactionId } from './model';

const name = 'Transaction';

export const CREATE = `${name}/CREATE`;
export const REMOVE = `${name}/DELETE`;
export const FETCH = `${name}/FETCH`;

export const create = createAction<Transaction>(CREATE);
export const remove = createAction<TransactionId>(REMOVE);
export const fetch = createAction<TransactionId>(FETCH);

export type CreateAction = ReturnType<typeof create>;
export const isCreateAction = create.match;

export type RemoveAction = ReturnType<typeof remove>;
export const isRemoveAction = remove.match;

export type FetchAction = ReturnType<typeof fetch>;
export const isFetchAction = fetch.match;

export type ReducerAction = CreateAction | RemoveAction;
export function isReducerAction(action: { type: string }): action is ReducerAction {
    return isCreateAction(action) || isRemoveAction(action);
}

export type SagaAction = FetchAction;
export function isSagaAction(action: { type: string }): action is SagaAction {
    return isFetchAction(action);
}

export type Action = ReducerAction | SagaAction;
export function isAction(action: { type: string }): action is Action {
    return isReducerAction(action) || isSagaAction(action);
}

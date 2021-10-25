import { createAction } from '@reduxjs/toolkit';
import { accountId } from '.';
import { Account, validatedAccount } from './model';

const name = 'Account';

export const CREATE = `${name}/CREATE`;
export const REMOVE = `${name}/DELETE`;
export const FETCH_BALANCE = `${name}/FETCH_BALANCE`;
export const FETCH_NONCE = `${name}/FETCH_NONCE`;

export const create = createAction(CREATE, (account: Account) => {
    return { payload: validatedAccount(account) };
});

export const remove = createAction(REMOVE, (accountOrId: string | Account) => {
    if (typeof accountOrId === 'string') {
        return { payload: accountOrId };
    }
    return { payload: accountId(accountOrId) };
});

export const fetchBalance = createAction<Account>(FETCH_BALANCE);
export const fetchNonce = createAction<Account>(FETCH_NONCE);

export type CreateAction = ReturnType<typeof create>;
export const isCreateAction = create.match;

export type RemoveAction = ReturnType<typeof remove>;
export const isRemoveAction = remove.match;

export type FetchBalanceAction = ReturnType<typeof fetchBalance>;
export const isFetchBalanceAction = fetchBalance.match;

export type FetchNonceAction = ReturnType<typeof fetchNonce>;
export const isFetchNonceAction = fetchNonce.match;

export type ReducerAction = CreateAction | RemoveAction;
export function isReducerAction(action: { type: string }): action is ReducerAction {
    return isCreateAction(action) || isRemoveAction(action);
}

export type SagaAction = FetchBalanceAction | FetchNonceAction;
export function isSagaAction(action: { type: string }): action is SagaAction {
    return isFetchBalanceAction(action) || isFetchNonceAction(action);
}

export type Action = ReducerAction | SagaAction;
export function isAction(action: { type: string }): action is Action {
    return isReducerAction(action) || isSagaAction(action);
}

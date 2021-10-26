import { createAction } from '@reduxjs/toolkit';
import { Account, accountId } from '../model';
import { name } from './index';

export const REMOVE = `${name}/DELETE`;

export const remove = createAction(REMOVE, (account: Account) => {
    return { payload: accountId(account) };
});

export type RemoveAction = ReturnType<typeof remove>;
export const isRemoveAction = remove.match;

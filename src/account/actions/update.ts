import { createAction } from '@reduxjs/toolkit';
import { Account, validatedAccount } from '../model';
import { name } from './common';

export const UPDATE = `${name}/UPDATE`;
export const update = createAction(UPDATE, (account: Account) => {
    return { payload: validatedAccount(account) };
});

export type UpdateAction = ReturnType<typeof update>;
export const isUpdateAction = update.match;

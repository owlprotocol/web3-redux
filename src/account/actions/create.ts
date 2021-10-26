import { createAction } from '@reduxjs/toolkit';
import { Account, validatedAccount } from '../model';
import { name } from './index';

export const CREATE = `${name}/CREATE`;
export const create = createAction(CREATE, (account: Account) => {
    return { payload: validatedAccount(account) };
});

export type CreateAction = ReturnType<typeof create>;
export const isCreateAction = create.match;

import { createAction } from '@reduxjs/toolkit';
import { Account } from '../model';
import { name } from './common';

export const FETCH_BALANCE = `${name}/FETCH_BALANCE`;
export const fetchBalance = createAction<Account>(FETCH_BALANCE);

export type FetchBalanceAction = ReturnType<typeof fetchBalance>;
export const isFetchBalanceAction = fetchBalance.match;

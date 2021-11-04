import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import { IdArgs, getId } from '../model/interface';

export const FETCH_BALANCE = `${name}/FETCH_BALANCE`;
export const fetchBalance = createAction(FETCH_BALANCE, (payload: IdArgs) => {
    return { payload: getId(payload) };
});

export type FetchBalanceAction = ReturnType<typeof fetchBalance>;
export const isFetchBalanceAction = fetchBalance.match;

export default fetchBalance;

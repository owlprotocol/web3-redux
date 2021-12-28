import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import { AccountId } from '../model/interface';

/** @internal */
export const FETCH_BALANCE = `${name}/FETCH_BALANCE`;
/** @category Actions */
export const fetchBalance = createAction(FETCH_BALANCE, (payload: AccountId) => {
    return { payload };
});
/** @internal */
export type FetchBalanceAction = ReturnType<typeof fetchBalance>;
/** @internal */
export const isFetchBalanceAction = fetchBalance.match;

export default fetchBalance;

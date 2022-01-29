import { createAction } from '@reduxjs/toolkit';
import { toChecksumAddress } from 'web3-utils';
import { name } from '../common';
import { ContractId } from '../model/interface';

/** @internal */
export const FETCH_BALANCE = `${name}/FETCH_BALANCE`;
/** @category Actions */
export const fetchBalance = createAction(FETCH_BALANCE, (payload: ContractId) => {
    return { payload: { networkId: payload.networkId, address: toChecksumAddress(payload.address) } };
});
/** @internal */
export type FetchBalanceAction = ReturnType<typeof fetchBalance>;
/** @internal */
export const isFetchBalanceAction = fetchBalance.match;

export default fetchBalance;

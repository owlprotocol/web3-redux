import { createAction } from '@reduxjs/toolkit';
import { toChecksumAddress } from 'web3-utils';
import { name } from '../common.js';
import { ContractId } from '../model/interface.js';

/** @internal */
export const GET_BALANCE = `${name}/GET_BALANCE`;
/** @category Actions */
export const getBalance = createAction(GET_BALANCE, (payload: ContractId) => {
    return { payload: { networkId: payload.networkId, address: toChecksumAddress(payload.address) } };
});
/** @internal */
export type GetBalanceAction = ReturnType<typeof getBalance>;
/** @internal */
export const isGetBalanceAction = getBalance.match;

export default getBalance;

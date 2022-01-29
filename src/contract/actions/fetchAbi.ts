import { createAction } from '@reduxjs/toolkit';
import { toChecksumAddress } from 'web3-utils';
import { name } from '../common';
import { ContractId } from '../model/interface';

/** @internal */
export const FETCH_ABI = `${name}/FETCH_ABI`;
/** @category Actions */
export const fetchAbi = createAction(FETCH_ABI, (payload: ContractId) => {
    return { payload: { networkId: payload.networkId, address: toChecksumAddress(payload.address) } };
});
/** @internal */
export type FetchAbiAction = ReturnType<typeof fetchAbi>;
/** @internal */
export const isFetchAbiAction = fetchAbi.match;

export default fetchAbi;

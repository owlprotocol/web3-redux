import { createAction } from '@reduxjs/toolkit';

import { name } from '../common.js';
import { ContractId } from '../model/interface.js';

/** @internal */
export const FETCH_ABI = `${name}/FETCH_ABI`;
/** @category Actions */
export const fetchAbi = createAction(FETCH_ABI, (payload: ContractId) => {
    return { payload: { networkId: payload.networkId, address: payload.address.toLowerCase() } };
});
/** @internal */
export type FetchAbiAction = ReturnType<typeof fetchAbi>;
/** @internal */
export const isFetchAbiAction = fetchAbi.match;

export default fetchAbi;

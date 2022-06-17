import { createAction } from '@reduxjs/toolkit';

import { name } from '../common.js';
import { ContractId } from '../model/interface.js';

/** @internal */
export const GET_ENS = `${name}/GET_ENS`;
/** @category Actions */
export const getEns = createAction(GET_ENS, (payload: ContractId) => {
    return { payload: { networkId: payload.networkId, address: payload.address.toLowerCase() } };
});
/** @internal */
export type GetEnsAction = ReturnType<typeof getEns>;
/** @internal */
export const isGetEnsAction = getEns.match;

export default getEns;

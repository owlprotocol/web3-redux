import { createAction } from '@reduxjs/toolkit';
import { toChecksumAddress } from 'web3-utils';
import { name } from '../common';
import { ContractId } from '../model/interface';

/** @internal */
export const GET_ENS = `${name}/GET_ENS`;
/** @category Actions */
export const getEns = createAction(GET_ENS, (payload: ContractId) => {
    return { payload: { networkId: payload.networkId, address: toChecksumAddress(payload.address) } };
});
/** @internal */
export type GetEnsAction = ReturnType<typeof getEns>;
/** @internal */
export const isGetEnsAction = getEns.match;

export default getEns;

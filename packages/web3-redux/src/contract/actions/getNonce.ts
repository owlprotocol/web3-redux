import { createAction } from '@reduxjs/toolkit';
import { toChecksumAddress } from '../../utils/web3-utils/index.js';
import { name } from '../common.js';
import { ContractId } from '../model/interface.js';

/** @internal */
export const GET_NONCE = `${name}/GET_NONCE`;
/** @category Actions */
export const getNonce = createAction(GET_NONCE, (payload: ContractId) => {
    return { payload: { networkId: payload.networkId, address: toChecksumAddress(payload.address) } };
});
/** @internal */
export type GetNonceAction = ReturnType<typeof getNonce>;
/** @internal */
export const isGetNonceAction = getNonce.match;

export default getNonce;

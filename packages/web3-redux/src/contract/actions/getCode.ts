import { createAction } from '@reduxjs/toolkit';
import { toChecksumAddress } from '../../utils/web3-utils/index.js';
import { name } from '../common.js';
import { ContractId } from '../model/interface.js';

/** @internal */
export const GET_CODE = `${name}/GET_CODE`;
/** @category Actions */
export const getCode = createAction(GET_CODE, (payload: ContractId) => {
    return { payload: { networkId: payload.networkId, address: toChecksumAddress(payload.address) } };
});
/** @internal */
export type GetCodeAction = ReturnType<typeof getCode>;
/** @internal */
export const isGetCodeAction = getCode.match;

export default getCode;

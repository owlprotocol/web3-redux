import { createAction } from '@reduxjs/toolkit';
import { toChecksumAddress } from 'web3-utils';
import { name } from '../common';
import { AccountId } from '../model/interface';

/** @internal */
export const GET_CODE = `${name}/GET_CODE`;
/** @category Actions */
export const getCode = createAction(GET_CODE, (payload: AccountId) => {
    return { payload: { networkId: payload.networkId, address: toChecksumAddress(payload.address) } };
});
/** @internal */
export type GetCodeAction = ReturnType<typeof getCode>;
/** @internal */
export const isGetCodeAction = getCode.match;

export default getCode;

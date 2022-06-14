import { createAction } from '@reduxjs/toolkit';
import { toChecksumAddress } from '../../utils/web3-utils/index.js';
import { name } from '../common.js';
import { ContractId } from '../model/interface.js';

/** @internal */
export const REMOVE = `${name}/DELETE`;
/** @category Actions */
export const remove = createAction(REMOVE, (payload: ContractId) => {
    return { payload: { networkId: payload.networkId, address: toChecksumAddress(payload.address.slice()) } };
});
/** @internal */
export type RemoveAction = ReturnType<typeof remove>;
/** @internal */
export const isRemoveAction = remove.match;

export default remove;

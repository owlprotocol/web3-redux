import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { isAddress } from '../../../utils/web3-utils/index.js';
import { name } from '../../common.js';
import { ContractId } from '../../model/index.js';

/** @internal */
export const REMOVE = `${name}/REMOVE`;
/** @category Actions */
export const removeAction = createAction(REMOVE, (payload: ContractId, uuid?: string) => {
    if (!isAddress(payload.address)) throw new Error(`Invalid address: ${payload.address}`);
    return {
        payload: { networkId: payload.networkId, address: payload.address.toLowerCase() },
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});
/** @internal */
export type RemoveAction = ReturnType<typeof removeAction>;
/** @internal */
export const isRemoveAction = removeAction.match;

export default removeAction;

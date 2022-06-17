import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { isAddress } from '../../../utils/web3-utils/index.js';
import { name } from '../../common.js';
import { ContractId } from '../../model/index.js';

/** @internal */
export const REMOVE_BATCHED = `${name}/REMOVE_BATCHED`;
/** @category Actions */
export const removeBatchedAction = createAction(REMOVE_BATCHED, (payload: ContractId[], uuid?: string) => {
    payload.forEach((p) => {
        if (!isAddress(p.address)) throw new Error(`Invalid address: ${p.address}`);
    });
    return {
        payload: payload.map((p) => {
            return { networkId: p.networkId, address: p.address.toLowerCase() };
        }),
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});
/** @internal */
export type RemoveBatchedAction = ReturnType<typeof removeBatchedAction>;
/** @internal */
export const isRemoveBatchedAction = removeBatchedAction.match;

export default removeBatchedAction;

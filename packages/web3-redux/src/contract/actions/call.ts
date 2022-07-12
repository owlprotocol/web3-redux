import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../common.js';
import { callHash } from '../model/callArgs.js';

/** @internal */
export const CALL = `${name}/CALL`;
/** @internal */
export interface CallActionInput {
    networkId: string;
    address: string;
    method: string;
    args?: any[];
    from?: string;
    defaultBlock?: number | 'latest';
    gas?: number;
}
/**
 * Create contract call
 * @category Actions
 */
export const call = createAction(CALL, (payload: CallActionInput, uuid?: string) => {
    const { networkId, address, method, args, defaultBlock, from } = payload;
    const id = callHash(networkId, address, method, { args, defaultBlock, from });
    return {
        payload: { id, networkId, address: address.toLowerCase(), method, args, defaultBlock, from },
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});
/** @internal */
export type CallAction = ReturnType<typeof call>;
/** @internal */
export const isCallAction = call.match;

export default call;

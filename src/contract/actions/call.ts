import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import { callHash } from '../model/callArgs';

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
 * Create contract
 * @category Actions
 */
export const call = createAction(CALL, (payload: CallActionInput) => {
    const { networkId, address, method, args, defaultBlock, from } = payload;
    const id = callHash(networkId, address, method, { args, defaultBlock, from });
    return { payload: { id, networkId, address, method, args, defaultBlock, from } };
});
/** @internal */
export type CallAction = ReturnType<typeof call>;
/** @internal */
export const isCallAction = call.match;

export default call;

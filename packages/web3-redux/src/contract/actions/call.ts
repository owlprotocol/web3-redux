import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../common.js';

/** @internal */
export const CALL = `${name}/CALL`;
/** @internal */
export interface CallActionInput {
    networkId: string;
    address: string;
    method: string;
    args?: any[];
    ifnull?: boolean;
}
/**
 * Create contract call
 * @category Actions
 */
export const call = createAction(CALL, (payload: CallActionInput, uuid?: string) => {
    const { networkId, address, method, args, ifnull } = payload;
    return {
        payload: { networkId, address: address.toLowerCase(), method, args, ifnull },
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

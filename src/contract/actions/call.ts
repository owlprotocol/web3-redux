import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';

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
/** @category Actions */
export const call = createAction(CALL, (payload: CallActionInput) => {
    return { payload: { ...payload } };
});
/** @internal */
export type CallAction = ReturnType<typeof call>;
/** @internal */
export const isCallAction = call.match;

export default call;

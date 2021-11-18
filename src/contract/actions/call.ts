import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';

export const CALL = `${name}/CALL`;
export interface CallActionInput {
    networkId: string;
    address: string;
    method: string;
    args?: any[];
    from?: string;
    defaultBlock?: number | 'latest';
    gas?: number;
}
export const call = createAction(CALL, (payload: CallActionInput) => {
    return { payload: { ...payload } };
});

export type CallAction = ReturnType<typeof call>;
export const isCallAction = call.match;

export default call;

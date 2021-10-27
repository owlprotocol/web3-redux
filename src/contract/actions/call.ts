import { createAction } from '@reduxjs/toolkit';
import { ZERO_ADDRESS } from '../../utils';
import { callArgsHash } from '../model';
import { name } from './common';

export const CALL = `${name}/CALL`;
export interface CallActionInput {
    networkId: string;
    address: string;
    method: string;
    args?: any[];
    from?: string;
    defaultBlock?: number | string;
    gas?: string;
}
export const call = createAction(CALL, (payload: CallActionInput) => {
    const from: string = payload.from ?? ZERO_ADDRESS;
    const defaultBlock = payload.defaultBlock ?? 'latest';
    //Update contract call key if not stored
    const argsHash = callArgsHash({ from, defaultBlock, args: payload.args });

    return { payload: { ...payload, from, defaultBlock, argsHash } };
});

export type CallAction = ReturnType<typeof call>;
export const isCallAction = call.match;

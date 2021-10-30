import { createAction } from '@reduxjs/toolkit';
import { Sync } from '../../sync/model';
import { callHash } from '../model';
import { CallActionInput } from './call';
import { name } from '../common';

export const CALL_UNSYNC = `${name}/CALL_UNSYNC`;
export interface CallUnsyncActionInput extends CallActionInput {
    defaultBlock?: 'latest';
    sync?: Sync['type'];
}
export const callUnsync = createAction(CALL_UNSYNC, (payload: string | CallUnsyncActionInput) => {
    if (typeof payload === 'string') return { payload };

    //Defaults
    const { networkId, address, method, args, defaultBlock, from, sync } = payload;
    const callArgs = { args, defaultBlock, from };
    const id = `${sync}-${callHash(networkId, address, method, callArgs)}`;

    return { payload: id };
});

export type CallUnsyncAction = ReturnType<typeof callUnsync>;
export const isCallUnsyncAction = callUnsync.match;

export default callUnsync;

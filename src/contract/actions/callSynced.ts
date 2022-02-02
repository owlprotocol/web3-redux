import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import { GenericSync, createSyncForActions } from '../../sync/model';
import { callHash } from '../model';
import { CallActionInput, call } from './call';

/** @internal */
export const CALL_SYNCED = `${name}/CALL_SYNCED`;
/** @internal */
export interface CallSyncedActionInput extends CallActionInput {
    defaultBlock?: undefined; //CallSynced actions cannot define defaultBlock parameter
    sync: GenericSync;
}
/** @category Actions */
export const callSynced = createAction(CALL_SYNCED, (payload: CallSyncedActionInput) => {
    //Defaults
    const { networkId, address, method, args, defaultBlock, from } = payload;
    const callArgs = { args, defaultBlock, from };
    const callAction = call({ networkId, address, method, args, defaultBlock, from });

    const sync = createSyncForActions(networkId, [callAction], payload.sync, address);
    const callId = callHash(networkId, address, method, callArgs);
    if (sync) sync.id = `${sync.type}-${callId}`;

    return { payload: { sync, callAction, callId } };
});
/** @internal */
export type CallSyncedAction = ReturnType<typeof callSynced>;
/** @internal */
export const isCallSyncedAction = callSynced.match;

export default callSynced;

import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import { GenericSync, createSyncForActions } from '../../sync/model';
import { callHash } from '../model';
import { CallActionInput, call } from './call';

/** @internal */
export const CALL_SYNCED = `${name}/CALL_SYNCED`;
/** @internal */
export interface CallSyncedActionInput extends CallActionInput {
    defaultBlock?: 'latest';
    sync: GenericSync;
}
/** @category Actions */
export const callSynced = createAction(CALL_SYNCED, (payload: CallSyncedActionInput) => {
    //Defaults
    const { networkId, address, method, args, defaultBlock, from } = payload;
    const callArgs = { args, defaultBlock, from };
    const callAction = call(payload);

    const sync = createSyncForActions(networkId, [callAction], payload.sync, address);
    if (sync) sync.id = `${sync.type}-${callHash(networkId, address, method, callArgs)}`;

    return { payload: { sync, callAction } };
});
/** @internal */
export type CallSyncedAction = ReturnType<typeof callSynced>;
/** @internal */
export const isCallSyncedAction = callSynced.match;

export default callSynced;

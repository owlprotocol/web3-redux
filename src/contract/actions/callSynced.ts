import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import { Sync } from '../../sync/model';
import { callHash } from '../model';
import { defaultTransactionSync } from '../../sync/model/TransactionSync';
import { defaultBlockSync, moduloBlockSync } from '../../sync/model/BlockSync';
import { CallActionInput, call } from './call';

/** @internal */
export const CALL_SYNCED = `${name}/CALL_SYNCED`;
/** @internal */
export interface CallSyncedActionInput extends CallActionInput {
    defaultBlock?: 'latest';
    sync: Sync | 'Block' | 'Transaction' | 'once' | number;
}
/** @category Actions */
export const callSynced = createAction(CALL_SYNCED, (payload: CallSyncedActionInput) => {
    //Defaults
    const { networkId, address, method, args, defaultBlock, from } = payload;
    const callArgs = { args, defaultBlock, from };
    const callAction = call(payload);

    //Default sync
    let sync: Sync | undefined;

    if (payload.sync === 'once') {
        sync = undefined;
    } else if (payload.sync === 'Transaction') {
        sync = defaultTransactionSync(networkId, address, [callAction]);
    } else if (payload.sync === 'Block') {
        sync = defaultBlockSync(networkId, [callAction]);
    } else if (typeof payload.sync === 'number') {
        sync = moduloBlockSync(networkId, payload.sync, [callAction]);
    } else {
        sync = payload.sync;
        sync.actions = [callAction]; //Override sync action
    }

    //Sync object
    if (sync) sync.id = `${sync.type}-${callHash(networkId, address, method, callArgs)}`;

    return { payload: { sync, callAction } };
});
/** @internal */
export type CallSyncedAction = ReturnType<typeof callSynced>;
/** @internal */
export const isCallSyncedAction = callSynced.match;

export default callSynced;

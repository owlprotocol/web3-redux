import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import { Sync } from '../../sync/model';
import { callHash } from '../model';
import { defaultTransactionSync } from '../../sync/model/TransactionSync';
import { defaultBlockSync } from '../../sync/model/BlockSync';
import { defaultEventSync } from '../../sync/model/EventSync';
import { CallActionInput, call } from './call';

export const CALL_SYNCED = `${name}/CALL_SYNCED`;
export interface CallSyncedActionInput extends CallActionInput {
    defaultBlock?: 'latest';
    sync?: Sync | Sync['type'] | true | 'once';
}
export const callSynced = createAction(CALL_SYNCED, (payload: CallSyncedActionInput) => {
    //Defaults
    const { networkId, address, method, args, defaultBlock, from } = payload;
    const callArgs = { args, defaultBlock, from };
    let sync: Sync | undefined | 'once';
    const callAction = call(payload);

    if (!payload.sync || payload.sync === true) {
        //undefined, default as true
        sync = defaultTransactionSync(networkId, address, [callAction]);
    } else if (payload.sync === 'Transaction') {
        sync = defaultTransactionSync(networkId, address, [callAction]);
    } else if (payload.sync === 'Block') {
        sync = defaultBlockSync(networkId, [callAction]);
    } else if (payload.sync === 'Event') {
        sync = defaultEventSync([callAction]);
    } else if (sync === 'once') {
        sync = 'once';
    } else {
        sync = payload.sync;
    }

    //Sync object
    if (!!sync && sync != 'once') sync.id = `${sync.type}-${callHash(networkId, address, method, callArgs)}`;

    return { payload: { sync, callAction } };
});

export type CallSyncedAction = ReturnType<typeof callSynced>;
export const isCallSyncedAction = callSynced.match;

export default callSynced;

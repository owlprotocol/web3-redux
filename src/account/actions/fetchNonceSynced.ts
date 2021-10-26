import { createAction } from '@reduxjs/toolkit';
import { Account, accountId } from '../model';
import { name } from './index';

import { Sync } from '../../sync/model';
import { defaultBlockSync } from '../../sync/model/BlockSync';
import { defaultEventSync } from '../../sync/model/EventSync';
import { defaultTransactionSync } from '../../sync/model/TransactionSync';

import { fetchNonce } from './fetchNonce';

export const FETCH_NONCE_SYNCED = `${name}/FETCH_NONCE_SYNCED`;
export interface FetchNonceSyncedActionInput extends Account {
    sync?: Sync | Sync['type'] | boolean;
}
export const fetchNonceSynced = createAction(FETCH_NONCE_SYNCED, (payload: FetchNonceSyncedActionInput) => {
    //Defaults
    const { networkId, address } = payload;
    let sync: Sync | undefined;
    const fetchNonceAction = fetchNonce(payload);

    if (payload.sync === false) {
        sync = undefined;
    } else if (!payload.sync || payload.sync === true) {
        //undefined, default as true
        sync = defaultTransactionSync([fetchNonceAction], networkId, address);
    } else if (payload.sync === 'Transaction') {
        sync = defaultTransactionSync([fetchNonceAction], networkId, address);
    } else if (payload.sync === 'Block') {
        sync = defaultBlockSync([fetchNonceAction], networkId);
    } else if (payload.sync === 'Event') {
        sync = defaultEventSync([fetchNonceAction]);
    } else {
        sync = payload.sync;
    }

    if (sync) sync.id = `${sync.type}-${accountId({ networkId, address })}`;

    return { payload: { sync, fetchNonceAction } };
});

export type FetchNonceSyncedAction = ReturnType<typeof fetchNonceSynced>;
export const isFetchNonceSyncedAction = fetchNonceSynced.match;

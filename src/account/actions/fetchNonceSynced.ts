import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import { AccountId, getId } from '../model/interface';

import { Sync } from '../../sync/model';
import { defaultBlockSync, moduloBlockSync } from '../../sync/model/BlockSync';
import { defaultEventSync } from '../../sync/model/EventSync';
import { defaultTransactionSync } from '../../sync/model/TransactionSync';

import { fetchNonce } from './fetchNonce';

/** @internal */
export const FETCH_NONCE_SYNCED = `${name}/FETCH_NONCE_SYNCED`;
/** @internal */
export interface FetchNonceSyncedActionInput extends AccountId {
    sync?: Sync | Sync['type'] | boolean | number;
}
/** @category Actions */
export const fetchNonceSynced = createAction(FETCH_NONCE_SYNCED, (payload: FetchNonceSyncedActionInput) => {
    const { networkId, address } = payload;
    const fetchNonceAction = fetchNonce(payload);
    //Default sync
    let sync: Sync | undefined;

    if (payload.sync === false) {
        sync = undefined;
    } else if (!payload.sync || payload.sync === true) {
        //undefined, default as true
        sync = defaultTransactionSync(networkId, address, [fetchNonceAction]);
    } else if (payload.sync === 'Transaction') {
        sync = defaultTransactionSync(networkId, address, [fetchNonceAction]);
    } else if (payload.sync === 'Block') {
        sync = defaultBlockSync(networkId, [fetchNonceAction]);
    } else if (payload.sync === 'Event') {
        sync = defaultEventSync([fetchNonceAction]);
    } else if (typeof payload.sync === 'number') {
        sync = moduloBlockSync(networkId, payload.sync, [fetchNonceAction]);
    } else {
        sync = payload.sync;
        sync.actions = [fetchNonceAction];
    }

    if (sync) sync.id = `${sync.type}-${getId(payload)}-fetchNonce`;

    return { payload: { networkId, address, sync, fetchNonceAction } };
});
/** @internal */
export type FetchNonceSyncedAction = ReturnType<typeof fetchNonceSynced>;
/** @internal */
export const isFetchNonceSyncedAction = fetchNonceSynced.match;

export default fetchNonceSynced;

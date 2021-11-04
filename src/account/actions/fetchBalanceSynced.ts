import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import { IdArgs, getId, getIdDeconstructed } from '../model/interface';

import { Sync } from '../../sync/model';
import { defaultBlockSync, moduloBlockSync } from '../../sync/model/BlockSync';
import { defaultEventSync } from '../../sync/model/EventSync';
import { defaultTransactionSync } from '../../sync/model/TransactionSync';

import { fetchBalance } from './fetchBalance';

export const FETCH_BALANCE_SYNCED = `${name}/FETCH_BALANCE_SYNCED`;
export interface FetchBalanceSyncedActionInput {
    id: IdArgs;
    sync?: Sync | Sync['type'] | boolean | number;
}
export const fetchBalanceSynced = createAction(FETCH_BALANCE_SYNCED, (payload: FetchBalanceSyncedActionInput) => {
    const id = getId(payload.id);
    const { networkId, address } = getIdDeconstructed(payload.id);
    const fetchBalanceAction = fetchBalance(payload.id);
    //Default sync
    let sync: Sync | undefined;

    if (payload.sync === false) {
        sync = undefined;
    } else if (!payload.sync || payload.sync === true) {
        //undefined, default as true
        sync = defaultTransactionSync(networkId, address, [fetchBalanceAction]);
    } else if (payload.sync === 'Transaction') {
        sync = defaultTransactionSync(networkId, address, [fetchBalanceAction]);
    } else if (payload.sync === 'Block') {
        sync = defaultBlockSync(networkId, [fetchBalanceAction]);
    } else if (payload.sync === 'Event') {
        sync = defaultEventSync([fetchBalanceAction]);
    } else if (typeof payload.sync === 'number') {
        sync = moduloBlockSync(networkId, payload.sync, [fetchBalanceAction]);
    } else {
        sync = payload.sync;
        sync.actions = [fetchBalanceAction];
    }

    if (sync) sync.id = `${sync.type}-${id}-fetchBalance`;

    return { payload: { id, sync, fetchBalanceAction } };
});

export type FetchBalanceSyncedAction = ReturnType<typeof fetchBalanceSynced>;
export const isFetchBalanceSyncedAction = fetchBalanceSynced.match;

export default fetchBalanceSynced;

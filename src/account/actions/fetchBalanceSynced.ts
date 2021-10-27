import { createAction } from '@reduxjs/toolkit';
import { Account, accountId } from '../model';
import { name } from './common';

import { Sync } from '../../sync/model';
import { defaultBlockSync, moduloBlockSync } from '../../sync/model/BlockSync';
import { defaultEventSync } from '../../sync/model/EventSync';
import { defaultTransactionSync } from '../../sync/model/TransactionSync';

import { fetchBalance } from './fetchBalance';

export const FETCH_BALANCE_SYNCED = `${name}/FETCH_BALANCE_SYNCED`;
export interface FetchBalanceSyncedActionInput extends Account {
    sync?: Sync | Sync['type'] | boolean | number;
}
export const fetchBalanceSynced = createAction(FETCH_BALANCE_SYNCED, (payload: FetchBalanceSyncedActionInput) => {
    //Defaults
    const { networkId, address } = payload;
    let sync: Sync | undefined;
    const fetchBalanceAction = fetchBalance(payload);

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

    if (sync) sync.id = `${sync.type}-${accountId({ networkId, address })}-fetchBalance`;

    return { payload: { sync, fetchBalanceAction } };
});

export type FetchBalanceSyncedAction = ReturnType<typeof fetchBalanceSynced>;
export const isFetchBalanceSyncedAction = fetchBalanceSynced.match;

import { createAction } from '@reduxjs/toolkit';
import { Account, accountId } from '../model';
import { name } from './index';

import { Sync } from '../../sync/model';
import { defaultBlockSync } from '../../sync/model/BlockSync';
import { defaultEventSync } from '../../sync/model/EventSync';
import { defaultTransactionSync } from '../../sync/model/TransactionSync';

import { fetchBalance } from './fetchBalance';

export const FETCH_BALANCE_SYNCED = `${name}/FETCH_BALANCE_SYNCED`;
export interface FetchBalanceSyncedActionInput extends Account {
    sync?: Sync | Sync['type'] | boolean;
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
        sync = defaultTransactionSync([fetchBalanceAction], networkId, address);
    } else if (payload.sync === 'Transaction') {
        sync = defaultTransactionSync([fetchBalanceAction], networkId, address);
    } else if (payload.sync === 'Block') {
        sync = defaultBlockSync([fetchBalanceAction], networkId);
    } else if (payload.sync === 'Event') {
        sync = defaultEventSync([fetchBalanceAction]);
    } else {
        sync = payload.sync;
    }

    if (sync) sync.id = `${sync.type}-${accountId({ networkId, address })}`;

    return { payload: { sync, fetchBalanceAction } };
});

export type FetchBalanceSyncedAction = ReturnType<typeof fetchBalanceSynced>;
export const isFetchBalanceSyncedAction = fetchBalanceSynced.match;

import { createAction } from '@reduxjs/toolkit';
import { toChecksumAddress } from 'web3-utils';
import { name } from '../common';
import { ContractId, getId } from '../model/interface';

import { Sync } from '../../sync/model';
import { defaultBlockSync, moduloBlockSync } from '../../sync/model/BlockSync';
import { defaultEventSync } from '../../sync/model/EventSync';
import { defaultTransactionSync } from '../../sync/model/TransactionSync';

import { fetchBalance } from './fetchBalance';

/** @internal */
export const FETCH_BALANCE_SYNCED = `${name}/FETCH_BALANCE_SYNCED`;
/** @internal */
export interface FetchBalanceSyncedActionInput extends ContractId {
    sync?: Sync | Sync['type'] | 'once' | number;
}
/** @category Actions */
export const fetchBalanceSynced = createAction(FETCH_BALANCE_SYNCED, (payload: FetchBalanceSyncedActionInput) => {
    const { networkId } = payload;
    const address = toChecksumAddress(payload.address);
    const fetchBalanceAction = fetchBalance({ networkId, address });
    //Default sync
    let sync: Sync | undefined;

    if (!payload.sync || payload.sync === 'once') {
        sync = undefined;
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

    if (sync) sync.id = `${sync.type}-${getId({ networkId, address })}-fetchBalance`;

    return { payload: { networkId, address, sync, fetchBalanceAction } };
});
/** @internal */
export type FetchBalanceSyncedAction = ReturnType<typeof fetchBalanceSynced>;
/** @internal */
export const isFetchBalanceSyncedAction = fetchBalanceSynced.match;

export default fetchBalanceSynced;

import { createAction } from '@reduxjs/toolkit';
import { toChecksumAddress } from 'web3-utils';
import { name } from '../common';
import { ContractId, getId } from '../model/interface';

import { Sync } from '../../sync/model';
import { defaultBlockSync, moduloBlockSync } from '../../sync/model/BlockSync';
import { defaultTransactionSync } from '../../sync/model/TransactionSync';

import { getBalance } from './getBalance';

/** @internal */
export const GET_BALANCE_SYNCED = `${name}/GET_BALANCE_SYNCED`;
/** @internal */
export interface GetBalanceSyncedActionInput extends ContractId {
    sync: Sync | 'Block' | 'Transaction' | 'once' | number;
}
/** @category Actions */
export const getBalanceSynced = createAction(GET_BALANCE_SYNCED, (payload: GetBalanceSyncedActionInput) => {
    const { networkId } = payload;
    const address = toChecksumAddress(payload.address);
    const fetchBalanceAction = getBalance({ networkId, address });
    //Default sync
    let sync: Sync | undefined;

    if (payload.sync === 'once') {
        sync = undefined;
    } else if (payload.sync === 'Transaction') {
        sync = defaultTransactionSync(networkId, address, [fetchBalanceAction]);
    } else if (payload.sync === 'Block') {
        sync = defaultBlockSync(networkId, [fetchBalanceAction]);
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
export type GetBalanceSyncedAction = ReturnType<typeof getBalanceSynced>;
/** @internal */
export const isGetBalanceSyncedAction = getBalanceSynced.match;

export default getBalanceSynced;

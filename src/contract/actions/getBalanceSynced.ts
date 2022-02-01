import { createAction } from '@reduxjs/toolkit';
import { toChecksumAddress } from 'web3-utils';
import { GenericSync, createSyncForActions } from '../../sync/model';
import { name } from '../common';
import { ContractId, getId } from '../model/interface';
import { getBalance } from './getBalance';

/** @internal */
export const GET_BALANCE_SYNCED = `${name}/GET_BALANCE_SYNCED`;
/** @internal */
export interface GetBalanceSyncedActionInput extends ContractId {
    sync: GenericSync;
}
/** @category Actions */
export const getBalanceSynced = createAction(GET_BALANCE_SYNCED, (payload: GetBalanceSyncedActionInput) => {
    const { networkId } = payload;
    const address = toChecksumAddress(payload.address);
    const fetchBalanceAction = getBalance({ networkId, address });

    const sync = createSyncForActions(networkId, [fetchBalanceAction], payload.sync, address);
    if (sync) sync.id = `${sync.type}-${getId({ networkId, address })}-fetchBalance`;

    return { payload: { networkId, address, sync, fetchBalanceAction } };
});
/** @internal */
export type GetBalanceSyncedAction = ReturnType<typeof getBalanceSynced>;
/** @internal */
export const isGetBalanceSyncedAction = getBalanceSynced.match;

export default getBalanceSynced;

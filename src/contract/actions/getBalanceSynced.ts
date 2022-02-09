import { toChecksumAddress } from 'web3-utils';
import { GenericSync, createSyncForActions } from '../../sync/model';
import { create as createSyncAction } from '../../sync/actions';
import { ContractId, getId } from '../model/interface';
import { getBalance } from './getBalance';

/** @internal */
export interface GetBalanceSyncedActionInput extends ContractId {
    sync: GenericSync;
}
/**
 * @category Actions
 * Creates a GET_BALANCE action and an associated SYNC action
 *
 */
export const getBalanceSynced = (payload: GetBalanceSyncedActionInput) => {
    const { networkId } = payload;
    const address = toChecksumAddress(payload.address);
    const getBalanceAction = getBalance({ networkId, address });
    const sync = createSyncForActions(networkId, [getBalanceAction], payload.sync, address);
    if (sync) sync.id = `${sync.type}-${getId({ networkId, address })}-getBalance`;
    const syncAction = sync ? createSyncAction(sync) : undefined;
    return { getBalanceAction, syncAction };
};

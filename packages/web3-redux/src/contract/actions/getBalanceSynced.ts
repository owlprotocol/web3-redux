import { getBalance } from './getBalance.js';
import { toChecksumAddress } from '../../utils/web3-utils/index.js';
import { GenericSync, createSyncForActions } from '../../sync/model/index.js';
import { create as createSyncAction } from '../../sync/actions/index.js';
import { ContractId, getId } from '../model/interface.js';

/** @internal */
export interface GetBalanceSyncedActionInput extends ContractId {
    sync: GenericSync;
}
/**
 * Creates a GET_BALANCE action and an associated SYNC action
 * @category Actions
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

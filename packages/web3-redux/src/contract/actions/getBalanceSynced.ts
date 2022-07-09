import { getBalance } from './getBalance.js';

import { GenericSync, createSyncForActions } from '../../sync/model/index.js';
import { ContractId } from '../model/interface.js';
import ContractCRUD from '../crud.js';
import { toReduxOrmId } from '../../createCRUDModel.js';
import SyncCRUD from '../../sync/crud.js';

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
    const address = payload.address.toLowerCase();
    const getBalanceAction = getBalance({ networkId, address });
    const sync = createSyncForActions(networkId, [getBalanceAction], payload.sync, address);
    if (sync) sync.id = `${sync.type}-${toReduxOrmId(ContractCRUD.validateId({ networkId, address }))}-getBalance`;
    const syncAction = sync ? SyncCRUD.actions.create(sync) : undefined;
    return { getBalanceAction, syncAction };
};

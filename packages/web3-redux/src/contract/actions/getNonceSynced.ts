import { getNonce } from './getNonce.js';

import { GenericSync, createSyncForActions } from '../../sync/model/index.js';
import { ContractId } from '../model/interface.js';
import ContractCRUD from '../crud.js';
import { toReduxOrmId } from '../../createCRUDModel.js';
import SyncCRUD from '../../sync/crud.js';

/** @internal */
export interface GetNonceSyncedActionInput extends ContractId {
    sync: GenericSync;
}
/**
 * Creates a GET_NONCE action and an associated SYNC action
 * @category Actions
 */
export const getNonceSynced = (payload: GetNonceSyncedActionInput) => {
    const { networkId } = payload;
    const address = payload.address.toLowerCase();
    const getNonceAction = getNonce({ networkId, address });

    const sync = createSyncForActions(networkId, [getNonceAction], payload.sync, address);
    if (sync) sync.id = `${sync.type}-${toReduxOrmId(ContractCRUD.validateId({ networkId, address }))}-getNonce`;
    const syncAction = sync ? SyncCRUD.actions.create(sync) : undefined;
    return { getNonceAction, syncAction };
};

export default getNonceSynced;

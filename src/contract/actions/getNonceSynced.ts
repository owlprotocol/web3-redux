import { toChecksumAddress } from 'web3-utils';
import { getNonce } from './getNonce';
import { GenericSync, createSyncForActions } from '../../sync/model';
import { create as createSyncAction } from '../../sync/actions';
import { ContractId, getId } from '../model/interface';

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
    const address = toChecksumAddress(payload.address);
    const getNonceAction = getNonce({ networkId, address });

    const sync = createSyncForActions(networkId, [getNonceAction], payload.sync, address);
    if (sync) sync.id = `${sync.type}-${getId(payload)}-getNonce`;
    const syncAction = sync ? createSyncAction(sync) : undefined;
    return { getNonceAction, syncAction };
};

export default getNonceSynced;

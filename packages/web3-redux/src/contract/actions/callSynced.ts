import { CallActionInput, call } from './call.js';
import { GenericSync, createSyncForActions } from '../../sync/model/index.js';
import SyncCRUD from '../../sync/crud.js';

/** @internal */
export interface CallSyncedActionInput extends CallActionInput {
    defaultBlock?: undefined; //CallSynced actions cannot define defaultBlock parameter
    sync: GenericSync;
}
/**
 * Creates a CALL action and an associated SYNC action
 * @category Actions
 *
 */
export const callSynced = (payload: CallSyncedActionInput) => {
    const { networkId, address } = payload;
    const callAction = call(payload);
    const sync = createSyncForActions(networkId, [callAction], payload.sync, address);
    if (sync) sync.id = `${sync.type}-${callAction.payload.id}`;
    const syncAction = sync ? SyncCRUD.actions.create(sync) : undefined;
    return { callAction, syncAction };
};

export default callSynced;

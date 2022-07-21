import { v4 as uuidv4 } from 'uuid';
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
export const callSynced = (payload: CallSyncedActionInput, uuid?: string) => {
    const { networkId, address } = payload;
    const callAction = call(payload);
    const sync = createSyncForActions(networkId, [callAction], payload.sync, address);
    if (sync) sync.id = `${sync.type}-${JSON.stringify(callAction.payload)}`;
    const syncAction = sync ? SyncCRUD.actions.upsert(sync, uuid ?? uuidv4()) : undefined;
    return { callAction, syncAction };
};

export default callSynced;

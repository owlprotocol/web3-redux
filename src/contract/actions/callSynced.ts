import { GenericSync, createSyncForActions } from '../../sync/model';
import { create as createSyncAction } from '../../sync/actions';
import { CallActionInput, call } from './call';

/** @internal */
export interface CallSyncedActionInput extends CallActionInput {
    defaultBlock?: undefined; //CallSynced actions cannot define defaultBlock parameter
    sync: GenericSync;
}
/**
 * @category Actions
 * Creates a CALL action and an associated SYNC action
 *
 */
export const callSynced = (payload: CallSyncedActionInput) => {
    const { networkId, address } = payload;
    const callAction = call(payload);
    const sync = createSyncForActions(networkId, [callAction], payload.sync, address);
    if (sync) sync.id = `${sync.type}-${callAction.payload.id}`;
    const syncAction = sync ? createSyncAction(sync) : undefined;
    return { callAction, syncAction };
};

export default callSynced;

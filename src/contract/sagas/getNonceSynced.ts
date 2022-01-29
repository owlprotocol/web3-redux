import { put } from 'typed-redux-saga/macro';
import { create as createSync } from '../../sync/actions';
import { GetNonceSyncedAction, GET_NONCE_SYNCED } from '../actions/getNonceSynced';

/** @internal */
const GET_NONCE_SYNCED_ERROR = `${GET_NONCE_SYNCED}/ERROR`;

/** @category Sagas */
function* getNonceSynced(action: GetNonceSyncedAction) {
    try {
        const { payload } = action;
        const { sync, fetchNonceAction } = payload;

        //Initial Action
        yield* put(fetchNonceAction);
        //Create Sync
        if (sync) {
            yield* put(createSync(sync));
        }
    } catch (error) {
        console.error(error);
        yield* put({
            type: GET_NONCE_SYNCED_ERROR,
            error,
            action,
        });
    }
}

export default getNonceSynced;

import { put } from 'typed-redux-saga/macro';
import { create as createSync } from '../../sync/actions';
import { FetchNonceSyncedAction, FETCH_NONCE_SYNCED } from '../actions/fetchNonceSynced';

const FETCH_NONCE_SYNCED_ERROR = `${FETCH_NONCE_SYNCED}/ERROR`;

function* fetchNonceSynced(action: FetchNonceSyncedAction) {
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
            type: FETCH_NONCE_SYNCED_ERROR,
            error,
            action,
        });
    }
}

export default fetchNonceSynced;

import { put } from 'redux-saga/effects';
import { create as createSync } from '../../sync/actions';
import { FetchNonceSyncedAction, FETCH_NONCE_SYNCED } from '../actions/fetchNonceSynced';

const FETCH_NONCE_SYNCED_ERROR = `${FETCH_NONCE_SYNCED}/ERROR`;

function* fetchNonceSynced(action: FetchNonceSyncedAction) {
    try {
        const { payload } = action;
        const { sync, fetchNonceAction } = payload;

        //Create Sync
        if (sync) {
            yield put(createSync(sync));
        }

        //Initial Action
        yield put(fetchNonceAction);
    } catch (error) {
        console.error(error);
        yield put({
            type: FETCH_NONCE_SYNCED_ERROR,
            error,
            action,
        });
    }
}

export default fetchNonceSynced;

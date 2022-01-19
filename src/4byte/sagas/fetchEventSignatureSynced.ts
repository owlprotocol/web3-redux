import { put } from 'typed-redux-saga/macro';
import { create as createSync } from '../../sync/actions';
import { FetchEventSignatureSyncedAction, FETCH_EVENT_SIGNATURE_SYNCED } from '../actions';

/** @internal */
const FETCH_EVENT_SIGNATURE_SYNCED_ERROR = `${FETCH_EVENT_SIGNATURE_SYNCED}/ERROR`;

/** @category Sagas */
function* fetchEventSignatureSynced(action: FetchEventSignatureSyncedAction) {
    try {
        const { payload } = action;
        const { sync, fetchEventSignatureAction } = payload;

        //Inital Action
        yield* put(fetchEventSignatureAction);
        //Create Sync
        if (sync) {
            yield* put(createSync(sync));
        }
    } catch (error) {
        console.error(error);
        yield* put({
            type: FETCH_EVENT_SIGNATURE_SYNCED_ERROR,
            error,
            action,
        });
    }
}

export default fetchEventSignatureSynced;

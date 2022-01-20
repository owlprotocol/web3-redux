import { put } from 'typed-redux-saga/macro';
import { create as createSync } from '../../sync/actions';
import { FetchFunctionSignatureSyncedAction, FETCH_FUNCTION_SIGNATURE_SYNCED } from '../actions';

/** @internal */
const FETCH_FUNCTION_SIGNATURE_SYNCED_ERROR = `${FETCH_FUNCTION_SIGNATURE_SYNCED}/ERROR`;

/** @category Sagas */
function* fetchFunctionSignatureSynced(action: FetchFunctionSignatureSyncedAction) {
    try {
        const { payload } = action;
        const { sync, fetchFunctionSignatureAction } = payload;

        //Inital Action
        yield* put(fetchFunctionSignatureAction);
        //Create Sync
        if (sync) {
            yield* put(createSync(sync));
        }
    } catch (error) {
        console.error(error);
        yield* put({
            type: FETCH_FUNCTION_SIGNATURE_SYNCED_ERROR,
            error,
            action,
        });
    }
}

export default fetchFunctionSignatureSynced;

import { put } from 'typed-redux-saga/macro';
import { create as createSync } from '../../sync/actions';
import { CallSyncedAction, CALL_SYNCED } from '../actions';

const CALL_SYNCED_ERROR = `${CALL_SYNCED}/ERROR`;

function* callSynced(action: CallSyncedAction) {
    try {
        const { payload } = action;
        const { sync, callAction } = payload;

        //Initial Action
        yield* put(callAction);
        //Create Sync
        if (sync) {
            yield* put(createSync(sync));
        }
    } catch (error) {
        console.error(error);
        yield* put({
            type: CALL_SYNCED_ERROR,
            error,
            action,
        });
    }
}

export default callSynced;

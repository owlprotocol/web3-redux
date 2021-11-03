import { put } from 'typed-redux-saga/macro';
import { create as createSync } from '../../sync/actions';
import { CallSyncedAction, CALL_SYNCED } from '../actions';

const CALL_SYNCED_ERROR = `${CALL_SYNCED}/ERROR`;

function* contractCallSynced(action: CallSyncedAction) {
    try {
        const { payload } = action;
        const { sync, callAction } = payload;

        //Create Sync
        if (sync && sync != 'once') {
            yield* put(createSync(sync));
        }

        if (sync) {
            //Initial Action if sync or set to trigger once
            yield* put(callAction);
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

export default contractCallSynced;

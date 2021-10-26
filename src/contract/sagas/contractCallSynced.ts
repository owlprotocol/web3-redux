import { put } from 'redux-saga/effects';
import { create as createSync } from '../../sync/actions';
//import { callArgsHash } from '../model';
import { CallSyncedAction, CALL_SYNCED } from '../actions';

const CALL_SYNCED_ERROR = `${CALL_SYNCED}/ERROR`;

function* contractCallSynced(action: CallSyncedAction) {
    try {
        const { payload } = action;
        const { sync, callAction } = payload;

        //Initial Action
        yield put(callAction);
        //Create Sync
        if (typeof sync != 'boolean') {
            yield put(createSync(sync));
        }
        //TODO: Customize id of call sync
    } catch (error) {
        console.error(error);
        yield put({
            type: CALL_SYNCED_ERROR,
            error,
            action,
        });
    }
}

export default contractCallSynced;

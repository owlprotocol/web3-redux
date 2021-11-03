import { put } from 'typed-redux-saga/macro';
import { remove as removeSync } from '../../sync/actions';
import { CallUnsyncAction } from '../actions';

function* contractCallUnsync(action: CallUnsyncAction) {
    const { payload } = action;

    //Remove Sync
    yield* put(removeSync(payload));
}

export default contractCallUnsync;

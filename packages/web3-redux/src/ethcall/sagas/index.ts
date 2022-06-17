import { all, takeEvery, spawn } from 'typed-redux-saga';
import fetch from './fetch.js';
import watchCreateDBSaga from './createDB.js';
import watchCreateDBBatchedSaga from './createDBBatched.js';
import watchLoadDBSaga from './loadDBAll.js';
import { FETCH } from '../actions/index.js';

/** @internal */
export default function* saga() {
    yield* all([
        takeEvery(FETCH, fetch),
        spawn(watchCreateDBSaga),
        spawn(watchCreateDBBatchedSaga),
        spawn(watchLoadDBSaga),
    ]);
}

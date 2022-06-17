import { all, takeEvery, spawn } from 'typed-redux-saga';
import fetchSaga from './fetch.js';
import subscribeLoop from './subscribeLoop.js';
import watchCreateDBSaga from './createDB.js';
import watchCreateDBBatchedSaga from './createDBBatched.js';
import watchLoadDBSaga from './loadDBAll.js';
import { FETCH } from '../actions/index.js';

/** @internal */
export function* saga() {
    yield* all([
        takeEvery(FETCH, fetchSaga),
        spawn(subscribeLoop),
        spawn(watchCreateDBSaga),
        spawn(watchCreateDBBatchedSaga),
        spawn(watchLoadDBSaga),
    ]);
}

export default saga;

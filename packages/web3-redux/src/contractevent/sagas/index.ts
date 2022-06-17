import { all, takeEvery, spawn } from 'typed-redux-saga';
import getAssets from './getAssets.js';
import getPastLogs from './getPastLogs.js';
import subscribeLogsLoop from './subscribeLogs.js';
import watchCreateDBSaga from './createDB.js';
import watchCreateDBBatchedSaga from './createDBBatched.js';
import watchLoadDBSaga from './loadDBAll.js';
import { GET_PAST_LOGS, GET_ASSETS } from '../actions/index.js';

/** @internal */
export function* saga() {
    yield* all([
        takeEvery(GET_PAST_LOGS, getPastLogs),
        takeEvery(GET_ASSETS, getAssets),
        spawn(subscribeLogsLoop),
        spawn(watchCreateDBSaga),
        spawn(watchCreateDBBatchedSaga),
        spawn(watchLoadDBSaga),
    ]);
}

export default saga;

import { all, takeEvery, spawn } from 'typed-redux-saga';
import getAssets from './getAssets.js';
import getPastLogs from './getPastLogs.js';
import subscribeLogsLoop from './subscribeLogs.js';
import { watchCreateDBSaga, watchCreateDBBatchedSaga } from './create/index.js';
import { watchRemoveDBSaga, watchRemoveDBBatchedSaga } from './remove/index.js';
import { watchUpdateDBSaga, watchUpdateDBBatchedSaga } from './update/index.js';
import watchLoadDBSaga from './loadDBAll.js';
import { GET_PAST_LOGS, GET_ASSETS } from '../actions/index.js';

/** @internal */
export function* saga() {
    yield* all([
        spawn(watchCreateDBSaga),
        spawn(watchCreateDBBatchedSaga),
        spawn(watchRemoveDBSaga),
        spawn(watchRemoveDBBatchedSaga),
        spawn(watchUpdateDBSaga),
        spawn(watchUpdateDBBatchedSaga),
        takeEvery(GET_PAST_LOGS, getPastLogs),
        takeEvery(GET_ASSETS, getAssets),
        spawn(subscribeLogsLoop),
        spawn(watchLoadDBSaga),
    ]);
}

export default saga;

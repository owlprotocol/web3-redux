import { all, takeEvery, spawn } from 'typed-redux-saga';
import fetch from './fetch.js';
import { watchCreateDBSaga, watchCreateDBBatchedSaga } from './create/index.js';
import { watchRemoveDBSaga, watchRemoveDBBatchedSaga } from './remove/index.js';
import { watchUpdateDBSaga, watchUpdateDBBatchedSaga } from './update/index.js';
import { FETCH } from '../actions/index.js';

/** @internal */
export default function* saga() {
    yield* all([
        spawn(watchCreateDBSaga),
        spawn(watchCreateDBBatchedSaga),
        spawn(watchRemoveDBSaga),
        spawn(watchRemoveDBBatchedSaga),
        spawn(watchUpdateDBSaga),
        spawn(watchUpdateDBBatchedSaga),
        takeEvery(FETCH, fetch),
    ]);
}

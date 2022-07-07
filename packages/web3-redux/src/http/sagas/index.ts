import { all, spawn } from 'typed-redux-saga';
import { watchHttpGetSaga } from './httpGet.js';
import { watchCreateDBSaga, watchCreateDBBatchedSaga } from './create/index.js';
import { watchRemoveDBSaga, watchRemoveDBBatchedSaga } from './remove/index.js';
import { watchUpdateDBSaga, watchUpdateDBBatchedSaga } from './update/index.js';

/** @internal */
export function* saga() {
    yield* all([
        spawn(watchCreateDBSaga),
        spawn(watchCreateDBBatchedSaga),
        spawn(watchRemoveDBSaga),
        spawn(watchRemoveDBBatchedSaga),
        spawn(watchUpdateDBSaga),
        spawn(watchUpdateDBBatchedSaga),
        spawn(watchHttpGetSaga),
    ]);
}

export default saga;

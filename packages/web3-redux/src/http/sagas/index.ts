import { all, spawn } from 'typed-redux-saga';
import { watchHttpGetSaga } from './httpGet.js';
import watchCreateDBSaga from './createDB.js';
import watchCreateDBBatchedSaga from './createDBBatched.js';
import watchLoadDBSaga from './loadDBAll.js';

/** @internal */
export function* saga() {
    yield* all([
        spawn(watchHttpGetSaga),
        spawn(watchCreateDBSaga),
        spawn(watchCreateDBBatchedSaga),
        spawn(watchLoadDBSaga),
    ]);
}

export default saga;

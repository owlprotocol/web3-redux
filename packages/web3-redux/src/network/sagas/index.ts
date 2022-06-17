import { all, takeEvery, spawn } from 'typed-redux-saga';
import getBlockNumber from './getBlockNumber.js';
import getChainId from './getChainId.js';
import { watchCreateDBSaga, watchCreateDBBatchedSaga } from './create/index.js';
import { watchRemoveDBSaga, watchRemoveDBBatchedSaga } from './remove/index.js';
import { watchUpdateDBSaga, watchUpdateDBBatchedSaga } from './update/index.js';
import watchLoadDBSaga from './loadDBAll.js';
import { GET_BLOCK_NUMBER, GET_CHAIN_ID } from '../actions/index.js';

/** @internal */
export default function* saga() {
    yield* all([
        spawn(watchCreateDBSaga),
        spawn(watchCreateDBBatchedSaga),
        spawn(watchRemoveDBSaga),
        spawn(watchRemoveDBBatchedSaga),
        spawn(watchUpdateDBSaga),
        spawn(watchUpdateDBBatchedSaga),
        takeEvery(GET_BLOCK_NUMBER, getBlockNumber),
        takeEvery(GET_CHAIN_ID, getChainId),
        spawn(watchLoadDBSaga),
    ]);
}

import { all, takeEvery, spawn } from 'typed-redux-saga';
import getBlockNumber from './getBlockNumber.js';
import getChainId from './getChainId.js';
import watchCreateDBSaga from './createDB.js';
import watchCreateDBBatchedSaga from './createDBBatched.js';
import watchLoadDBSaga from './loadDBAll.js';
import { GET_BLOCK_NUMBER, GET_CHAIN_ID } from '../actions/index.js';

/** @internal */
export default function* saga() {
    yield* all([
        takeEvery(GET_BLOCK_NUMBER, getBlockNumber),
        takeEvery(GET_CHAIN_ID, getChainId),
        spawn(watchCreateDBSaga),
        spawn(watchCreateDBBatchedSaga),
        spawn(watchLoadDBSaga),
    ]);
}

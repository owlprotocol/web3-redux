import { all, takeEvery, spawn } from 'typed-redux-saga';
import getBlockNumber from './getBlockNumber.js';
import getChainId from './getChainId.js';
import { GET_BLOCK_NUMBER, GET_CHAIN_ID } from '../actions/index.js';
import NetworkCRUD from '../crud.js';

/** @internal */
export default function* saga() {
    yield* all([
        spawn(NetworkCRUD.sagas.crudRootSaga),
        takeEvery(GET_BLOCK_NUMBER, getBlockNumber),
        takeEvery(GET_CHAIN_ID, getChainId),
    ]);
}

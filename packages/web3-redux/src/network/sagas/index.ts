import { all, takeEvery } from 'typed-redux-saga';
import getBlockNumber from './getBlockNumber.js';
import getChainId from './getChainId.js';
import { GET_BLOCK_NUMBER, GET_CHAIN_ID } from '../actions/index.js';

/** @internal */
export default function* saga() {
    yield* all([takeEvery(GET_BLOCK_NUMBER, getBlockNumber)]);
    yield* all([takeEvery(GET_CHAIN_ID, getChainId)]);
}

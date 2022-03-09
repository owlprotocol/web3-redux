import { all, takeEvery } from 'typed-redux-saga/macro';
import getBlockNumber from './getBlockNumber';
import getChainId from './getChainId';
import { GET_BLOCK_NUMBER, GET_CHAIN_ID } from '../actions';

/** @internal */
export default function* saga() {
    yield* all([takeEvery(GET_BLOCK_NUMBER, getBlockNumber)]);
    yield* all([takeEvery(GET_CHAIN_ID, getChainId)]);
}

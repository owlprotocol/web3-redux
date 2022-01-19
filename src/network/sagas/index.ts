import { all, takeEvery } from 'typed-redux-saga/macro';
import { GET_BLOCK_NUMBER } from '../actions';
import getBlockNumber from './getBlockNumber';

/** @internal */
export default function* saga() {
    yield* all([takeEvery(GET_BLOCK_NUMBER, getBlockNumber)]);
}

import { all, takeEvery } from 'typed-redux-saga';
import fetch from './fetch.js';
import { FETCH } from '../actions/index.js';

/** @internal */
export default function* saga() {
    yield* all([takeEvery(FETCH, fetch)]);
}

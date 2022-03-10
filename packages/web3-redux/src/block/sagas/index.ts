import { all, takeEvery, spawn } from 'typed-redux-saga/macro';
import fetch from './fetch.js';
import subscribeLoop from './subscribeLoop.js';
import { FETCH } from '../actions/index.js';

/** @internal */
export function* saga() {
    yield* all([takeEvery(FETCH, fetch), spawn(subscribeLoop)]);
}

export default saga;

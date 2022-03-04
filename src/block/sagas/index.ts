import { all, takeEvery, spawn } from 'typed-redux-saga/macro';
import fetch from './fetch';
import subscribeLoop from './subscribeLoop';
import { FETCH } from '../actions';

/** @internal */
export function* saga() {
    yield* all([takeEvery(FETCH, fetch), spawn(subscribeLoop)]);
}

export default saga;

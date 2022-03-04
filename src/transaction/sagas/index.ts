import { all, takeEvery } from 'typed-redux-saga/macro';
import fetch from './fetch';
import { FETCH } from '../actions';

/** @internal */
export default function* saga() {
    yield* all([takeEvery(FETCH, fetch)]);
}

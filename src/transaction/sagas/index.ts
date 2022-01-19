import { all, takeEvery } from 'typed-redux-saga/macro';
import { FETCH } from '../actions';
import fetch from './fetch';

/** @internal */
export default function* saga() {
    yield* all([takeEvery(FETCH, fetch)]);
}

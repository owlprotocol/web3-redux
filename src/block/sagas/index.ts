import { all, takeEvery, spawn } from 'typed-redux-saga/macro';
import { FETCH } from '../actions';
import fetch from './fetch';
import subscribeLoop from './subscribeLoop';

export default function* saga() {
    yield* all([takeEvery(FETCH, fetch), spawn(subscribeLoop)]);
}

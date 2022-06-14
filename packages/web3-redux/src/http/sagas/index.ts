import { all, takeEvery } from 'typed-redux-saga';
import { httpGet } from './httpGet.js';
import { HTTP_GET } from '../actions/index.js';

/** @internal */
export function* saga() {
    yield* all([takeEvery(HTTP_GET, httpGet)]);
}

export default saga;

import { all, takeEvery } from 'typed-redux-saga/macro';
import { objectGet } from './objectGet';
import { cat } from './cat';
import { fetchIpfs } from './fetchIpfs';
import { OBJECT_GET, CAT, FETCH_IPFS } from '../actions';

/** @internal */
export function* saga() {
    yield* all([takeEvery(OBJECT_GET, objectGet)]);
    yield* all([takeEvery(CAT, cat)]);
    yield* all([takeEvery(FETCH_IPFS, fetchIpfs)]);
}

export default saga;

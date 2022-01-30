import { all, takeEvery } from 'typed-redux-saga/macro';
import { FETCH_IPFS } from '../actions';
import fetchIpfs from './fetchIpfs';

/** @internal */
export function* saga() {
    yield* all([takeEvery(FETCH_IPFS, fetchIpfs)]);
}

export default saga;

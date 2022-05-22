import { all, takeEvery } from 'typed-redux-saga';
import { objectGet } from './objectGet.js';
import { cat } from './cat.js';
import { fetchIpfs } from './fetchIpfs.js';
import putCBOR from './putCBOR.js';
import { OBJECT_GET, CAT, FETCH_IPFS, PUT_CBOR } from '../actions/index.js';

/** @internal */
export function* saga() {
    yield* all([
        takeEvery(OBJECT_GET, objectGet),
        takeEvery(CAT, cat),
        takeEvery(FETCH_IPFS, fetchIpfs),
        takeEvery(PUT_CBOR, putCBOR),
    ]);
}

export default saga;

import { all, takeEvery, spawn } from 'typed-redux-saga';
import { objectGet } from './objectGet.js';
import { cat } from './cat.js';
import { fetchIpfs } from './fetchIpfs.js';
import putCBOR from './putCBOR.js';
//Core IPFS API - Root
import add from './add.js';
import addAll from './addAll.js';
import cat2 from './cat2.js';
import get from './get.js';
//Core IPFS API - Block
import blockGet from './blockGet.js';
import blockPut from './blockPut.js';
import {
    OBJECT_GET,
    CAT,
    FETCH_IPFS,
    PUT_CBOR,
    ADD,
    ADD_ALL,
    CAT2,
    GET,
    BLOCK_GET,
    BLOCK_PUT,
} from '../actions/index.js';
import IPFSCacheCRUD from '../crud.js';

/** @internal */
export function* saga() {
    yield* all([
        spawn(IPFSCacheCRUD.sagas.crudRootSaga),
        takeEvery(OBJECT_GET, objectGet),
        takeEvery(CAT, cat),
        takeEvery(FETCH_IPFS, fetchIpfs),
        takeEvery(PUT_CBOR, putCBOR),
        takeEvery(ADD, add),
        takeEvery(ADD_ALL, addAll),
        takeEvery(CAT2, cat2),
        takeEvery(GET, get),
        takeEvery(BLOCK_GET, blockGet),
        takeEvery(BLOCK_PUT, blockPut),
    ]);
}

export default saga;

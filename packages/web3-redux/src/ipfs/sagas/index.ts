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
import { watchCreateDBSaga, watchCreateDBBatchedSaga } from './create/index.js';
import { watchRemoveDBSaga, watchRemoveDBBatchedSaga } from './remove/index.js';
import { watchUpdateDBSaga, watchUpdateDBBatchedSaga } from './update/index.js';
import watchLoadDBSaga from './loadDBAll.js';
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

/** @internal */
export function* saga() {
    yield* all([
        spawn(watchCreateDBSaga),
        spawn(watchCreateDBBatchedSaga),
        spawn(watchRemoveDBSaga),
        spawn(watchRemoveDBBatchedSaga),
        spawn(watchUpdateDBSaga),
        spawn(watchUpdateDBBatchedSaga),
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
        spawn(watchLoadDBSaga),
    ]);
}

export default saga;

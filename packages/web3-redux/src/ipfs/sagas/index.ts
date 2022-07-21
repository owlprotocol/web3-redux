import { all, takeEvery, spawn } from 'typed-redux-saga';
//Core IPFS API - Root
import add from './add.js';
import addAll from './addAll.js';
import cat from './cat.js';
import { ADD, ADD_ALL, CAT } from '../actions/index.js';
import IPFSCacheCRUD from '../crud.js';

/** @internal */
export function* saga() {
    yield* all([
        spawn(IPFSCacheCRUD.sagas.crudRootSaga),
        takeEvery(ADD, add),
        takeEvery(ADD_ALL, addAll),
        takeEvery(CAT, cat),
    ]);
}

export default saga;

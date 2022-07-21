import { all, takeEvery, spawn } from 'typed-redux-saga';
import fetch from './fetch.js';
import { FETCH } from '../actions/index.js';
import EthCallCRUD from '../crud.js';

/** @internal */
export default function* saga() {
    yield* all([spawn(EthCallCRUD.sagas.crudRootSaga), takeEvery(FETCH, fetch)]);
}

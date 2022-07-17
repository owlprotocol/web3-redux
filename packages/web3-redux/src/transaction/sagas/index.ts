import { all, takeEvery, spawn } from 'typed-redux-saga';
import fetch from './fetch.js';
import { FETCH } from '../actions/index.js';
import TransactionCRUD from '../crud.js';

/** @internal */
export default function* saga() {
    yield* all([spawn(TransactionCRUD.sagas.crudRootSaga), takeEvery(FETCH, fetch)]);
}

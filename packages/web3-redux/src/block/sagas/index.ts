import { all, takeEvery, spawn } from 'typed-redux-saga';
import fetchSaga from './fetch.js';
import subscribeLoop from './subscribeLoop.js';
import BlockCRUD from '../crud.js';
import { FETCH } from '../actions/index.js';

/** @internal */
export function* rootSaga() {
    yield* all([spawn(BlockCRUD.sagas.crudRootSaga), takeEvery(FETCH, fetchSaga), spawn(subscribeLoop)]);
}

export default rootSaga;

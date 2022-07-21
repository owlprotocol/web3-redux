import { all, takeEvery, spawn } from 'typed-redux-saga';
import { fetchEventSignature } from './fetchEventSignature.js';
import { fetchFunctionSignature } from './fetchFunctionSignature.js';
import { FETCH_EVENT_SIGNATURE, FETCH_FUNCTION_SIGNATURE } from '../actions/index.js';
import _4ByteCRUD from '../crud.js';

/** @internal */
export function* rootSaga() {
    yield* all([
        spawn(_4ByteCRUD.sagas.crudRootSaga),
        takeEvery(FETCH_EVENT_SIGNATURE, fetchEventSignature),
        takeEvery(FETCH_FUNCTION_SIGNATURE, fetchFunctionSignature),
    ]);
}

export default rootSaga;

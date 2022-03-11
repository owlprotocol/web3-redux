import { all, takeEvery } from 'typed-redux-saga';
import { fetchEventSignature } from './fetchEventSignature.js';
import { fetchFunctionSignature } from './fetchFunctionSignature.js';
import { FETCH_EVENT_SIGNATURE, FETCH_FUNCTION_SIGNATURE } from '../actions/index.js';

/** @internal */
export function* saga() {
    yield* all([
        takeEvery(FETCH_EVENT_SIGNATURE, fetchEventSignature),
        takeEvery(FETCH_FUNCTION_SIGNATURE, fetchFunctionSignature),
    ]);
}

export default saga;

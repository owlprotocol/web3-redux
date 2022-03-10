import { all, takeEvery } from 'typed-redux-saga/macro';
import { fetchEventSignature } from './fetchEventSignature';
import { fetchFunctionSignature } from './fetchFunctionSignature';
import { FETCH_EVENT_SIGNATURE, FETCH_FUNCTION_SIGNATURE } from '../actions';

/** @internal */
export function* saga() {
    yield* all([
        takeEvery(FETCH_EVENT_SIGNATURE, fetchEventSignature),
        takeEvery(FETCH_FUNCTION_SIGNATURE, fetchFunctionSignature),
    ]);
}

export default saga;

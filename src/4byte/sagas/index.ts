import { all, takeEvery } from 'typed-redux-saga/macro';
import {
    FETCH_EVENT_SIGNATURE,
    FETCH_EVENT_SIGNATURE_SYNCED,
    FETCH_FUNCTION_SIGNATURE,
    FETCH_FUNCTION_SIGNATURE_SYNCED,
} from '../actions';
import fetchEventSignature from './fetchEventSignature';
import fetchEventsignatureSynced from './fetchEventSignatureSynced';
import fetchFunctionSignature from './fetchFunctionSignature';
import fetchFunctionSignatureSynced from './fetchFunctionSignatureSynced';

/** @internal */
export function* saga() {
    yield* all([
        takeEvery(FETCH_EVENT_SIGNATURE, fetchEventSignature),
        takeEvery(FETCH_EVENT_SIGNATURE_SYNCED, fetchEventsignatureSynced),
        takeEvery(FETCH_FUNCTION_SIGNATURE, fetchFunctionSignature),
        takeEvery(FETCH_FUNCTION_SIGNATURE_SYNCED, fetchFunctionSignatureSynced),
    ]);
}

export default saga;

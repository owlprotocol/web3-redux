import { all, takeEvery } from 'typed-redux-saga/macro';
import { FETCH_EVENT_SIGNATURE, FETCH_EVENT_SIGNATURE_SYNCED } from '../actions';
import fetchEventSignature from './fetchEventSignature';
import fetchEventsignatureSynced from './fetchEventSignatureSynced';

/** @internal */
export function* saga() {
    yield* all([
        takeEvery(FETCH_EVENT_SIGNATURE, fetchEventSignature),
        takeEvery(FETCH_EVENT_SIGNATURE_SYNCED, fetchEventsignatureSynced),
    ]);
}

export default saga;

import { takeEvery, all, spawn } from 'typed-redux-saga/macro';
import { CALL, CALL_BATCHED, CALL_SYNCED, SEND, EVENT_GET_PAST } from '../actions';
import call from './call';
import callBatched from './callBatched';
import callSynced from './callSynced';
import eventGetPast from './eventGetPast';
import eventSubscribe from './eventSubscribe';
import send from './send';

//https://redux-saga.js.org/docs/advanced/RootSaga
/** @internal */
export function* saga() {
    yield* all([
        takeEvery(CALL, call),
        takeEvery(CALL_BATCHED, callBatched),
        takeEvery(CALL_SYNCED, callSynced),
        takeEvery(SEND, send),
        takeEvery(EVENT_GET_PAST, eventGetPast),
        spawn(eventSubscribe),
    ]);
}

/*
//https://redux-saga.js.org/docs/advanced/RootSaga/#keeping-everything-alive
export function* saga() {
    const sagas = [
        takeEvery(CALL, contractCall),
        takeEvery(CALL_BATCHED, contractCallBatched),
        takeEvery(CALL_SYNCED, contractCallSynced),
        takeEvery(SEND, contractSend),
        takeEvery(EVENT_GET_PAST, contractEventGetPast),
        //contractEventSubscribe(),
    ];

    yield all(
        sagas.map((saga) =>
            spawn(function* () {
                while (true) {
                    try {
                        //@ts-ignore
                        yield call(saga);
                        break;
                    } catch (e) {
                        console.error(e);
                    }
                }
            }),
        ),
    );
}
*/

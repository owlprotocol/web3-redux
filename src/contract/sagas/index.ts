import { takeEvery, all, spawn } from 'typed-redux-saga/macro';
import { CALL, CALL_BATCHED, CALL_SYNCED, SEND, EVENT_GET_PAST } from '../actions';
import contractCall from './contractCall';
import contractCallBatched from './contractCallBatched';
import contractCallSynced from './contractCallSynced';
import contractEventGetPast from './contractEventGetPast';
import contractEventSubscribe from './contractEventSubscribe';
import contractSend from './contractSend';

//https://redux-saga.js.org/docs/advanced/RootSaga
export function* saga() {
    yield* all([
        takeEvery(CALL, contractCall),
        takeEvery(CALL_BATCHED, contractCallBatched),
        takeEvery(CALL_SYNCED, contractCallSynced),
        takeEvery(SEND, contractSend),
        takeEvery(EVENT_GET_PAST, contractEventGetPast),
        spawn(contractEventSubscribe),
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

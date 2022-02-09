import { takeEvery, all, spawn } from 'typed-redux-saga/macro';
import {
    CALL,
    CALL_BATCHED,
    SEND,
    EVENT_GET_PAST,
    FETCH_ABI,
    FETCH_TRANSACTIONS,
    GET_CODE,
    GET_BALANCE,
    GET_NONCE,
} from '../actions';
import call from './call';
import callBatched from './callBatched';
import eventGetPast from './eventGetPast';
import eventSubscribe from './eventSubscribe';
import send from './send';
import fetchAbi from './fetchAbi';
import getBalance from './getBalance';
import getNonce from './getNonce';
import fetchTransactions from './fetchTransactions';
import getCode from './getCode';

//https://redux-saga.js.org/docs/advanced/RootSaga
/** @internal */
export function* saga() {
    yield* all([
        takeEvery(CALL, call),
        takeEvery(CALL_BATCHED, callBatched),
        takeEvery(SEND, send),
        takeEvery(EVENT_GET_PAST, eventGetPast),
        spawn(eventSubscribe),
        takeEvery(FETCH_ABI, fetchAbi),
        takeEvery(GET_BALANCE, getBalance),
        takeEvery(GET_NONCE, getNonce),
        takeEvery(GET_CODE, getCode),
        takeEvery(FETCH_TRANSACTIONS, fetchTransactions),
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

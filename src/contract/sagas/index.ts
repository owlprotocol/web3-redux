import { takeEvery, all, spawn } from 'typed-redux-saga/macro';
import {
    CALL,
    CALL_BATCHED,
    CALL_SYNCED,
    SEND,
    EVENT_GET_PAST,
    FETCH_ABI,
    FETCH_BALANCE,
    FETCH_BALANCE_SYNCED,
    FETCH_NONCE,
    FETCH_NONCE_SYNCED,
    FETCH_TRANSACTIONS,
    GET_CODE,
} from '../actions';
import call from './call';
import callBatched from './callBatched';
import callSynced from './callSynced';
import eventGetPast from './eventGetPast';
import eventSubscribe from './eventSubscribe';
import send from './send';
import fetchAbi from './fetchAbi';
import fetchBalance from './fetchBalance';
import fetchNonce from './fetchNonce';
import fetchTransactions from './fetchTransactions';
import fetchBalanceSynced from './fetchBalanceSynced';
import fetchNonceSynced from './fetchNonceSynced';
import getCode from './getCode';

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
        takeEvery(FETCH_ABI, fetchAbi),
        takeEvery(FETCH_BALANCE, fetchBalance),
        takeEvery(FETCH_NONCE, fetchNonce),
        takeEvery(FETCH_BALANCE_SYNCED, fetchBalanceSynced),
        takeEvery(FETCH_NONCE_SYNCED, fetchNonceSynced),
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

import { takeEvery, all, spawn } from 'typed-redux-saga';
import watchCallSaga from './call.js';
import { callBatched } from './callBatched.js';
import { eventGetPast } from './eventGetPast.js';
import { eventSubscribeLoop } from './eventSubscribe.js';
import { send } from './send.js';
import { fetchAbi } from './fetchAbi.js';
import { getBalance } from './getBalance.js';
import { getNonce } from './getNonce.js';
import { fetchTransactions } from './fetchTransactions.js';
import { getCode } from './getCode.js';
import { getEns } from './getEns.js';
import watchEventGetPastRaw from './eventGetPastRaw.js';
import {
    CALL_BATCHED,
    SEND,
    EVENT_GET_PAST,
    FETCH_ABI,
    FETCH_TRANSACTIONS,
    GET_CODE,
    GET_ENS,
    GET_BALANCE,
    GET_NONCE,
} from '../actions/index.js';

//https://typed-redux-saga.js.org/docs/advanced/RootSaga
/** @internal */
export function* saga() {
    yield* all([
        spawn(watchCallSaga),
        takeEvery(EVENT_GET_PAST, eventGetPast),
        spawn(watchEventGetPastRaw),
        takeEvery(CALL_BATCHED, callBatched),
        takeEvery(SEND, send),
        spawn(eventSubscribeLoop),
        takeEvery(FETCH_ABI, fetchAbi),
        takeEvery(GET_BALANCE, getBalance),
        takeEvery(GET_NONCE, getNonce),
        takeEvery(GET_CODE, getCode),
        takeEvery(FETCH_TRANSACTIONS, fetchTransactions),
        takeEvery(GET_ENS, getEns),
    ]);
}

export default saga;

/*
//https://typed-redux-saga.js.org/docs/advanced/RootSaga/#keeping-everything-alive
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

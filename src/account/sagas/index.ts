import { all, takeEvery } from 'typed-redux-saga/macro';
import {
    FETCH_BALANCE,
    FETCH_NONCE,
    FETCH_TRANSACTIONS,
    FETCH_BALANCE_SYNCED,
    FETCH_NONCE_SYNCED,
    GET_CODE,
} from '../actions';
import fetchBalance from './fetchBalance';
import fetchNonce from './fetchNonce';
import fetchTransactions from './fetchTransactions';
import fetchBalanceSynced from './fetchBalanceSynced';
import fetchNonceSynced from './fetchNonceSynced';
import getCode from './getCode';

/** @internal */
export function* saga() {
    yield* all([
        takeEvery(FETCH_BALANCE, fetchBalance),
        takeEvery(FETCH_NONCE, fetchNonce),
        takeEvery(FETCH_BALANCE_SYNCED, fetchBalanceSynced),
        takeEvery(FETCH_NONCE_SYNCED, fetchNonceSynced),
        takeEvery(GET_CODE, getCode),
        takeEvery(FETCH_TRANSACTIONS, fetchTransactions),
    ]);
}

export default saga;

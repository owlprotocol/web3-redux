import { all, takeEvery } from 'redux-saga/effects';
import { FETCH_BALANCE, FETCH_NONCE } from '../actions';
import fetchBalance from './accountFetchBalance';
import fetchNonce from './accountFetchNonce';

export function* saga() {
    yield all([takeEvery(FETCH_BALANCE, fetchBalance), takeEvery(FETCH_NONCE, fetchNonce)]);
}

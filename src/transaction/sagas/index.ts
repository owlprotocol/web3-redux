import { all, spawn } from 'redux-saga/effects';
import fetchLoop from './transactionFetch';

export function* saga() {
    yield all([spawn(fetchLoop)]);
}

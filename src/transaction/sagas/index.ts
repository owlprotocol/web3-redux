import { all, spawn } from 'redux-saga/effects';
import createLoop from './transactionCreate';
import fetchLoop from './transactionFetch';

export function* saga() {
    yield all([spawn(createLoop), spawn(fetchLoop)]);
}

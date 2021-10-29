import { all, spawn } from 'typed-redux-saga/macro';
import fetchLoop from './transactionFetch';

export function* saga() {
    yield* all([spawn(fetchLoop)]);
}

import { all, spawn } from 'redux-saga/effects';
import blockFetchLoop from './blockFetch';
import blockSubscribeLoop from './blockSubscribe';

export function* saga() {
    yield all([spawn(blockFetchLoop), spawn(blockSubscribeLoop)]);
}

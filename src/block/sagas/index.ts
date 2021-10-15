import { all, spawn } from 'redux-saga/effects';
import blockCreateLoop from './blockCreate';
import blockFetchLoop from './blockFetch';
import blockSubscribeLoop from './blockSubscribe';

export function* saga() {
    yield all([spawn(blockCreateLoop), spawn(blockFetchLoop), spawn(blockSubscribeLoop)]);
}

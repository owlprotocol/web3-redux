import { all, spawn } from 'typed-redux-saga/macro';
import blockFetchLoop from './blockFetch';
import blockSubscribeLoop from './blockSubscribe';

export function* saga() {
    yield* all([spawn(blockFetchLoop), spawn(blockSubscribeLoop)]);
}

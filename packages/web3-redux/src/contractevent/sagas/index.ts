import { all, takeEvery, spawn } from 'typed-redux-saga/macro';
import getAssets from './getAssets.js';
import getPastLogs from './getPastLogs.js';
import subscribeLogsLoop from './subscribeLogs.js';
import { GET_PAST_LOGS, GET_ASSETS } from '../actions/index.js';

/** @internal */
export function* saga() {
    yield* all([takeEvery(GET_PAST_LOGS, getPastLogs), takeEvery(GET_ASSETS, getAssets), spawn(subscribeLogsLoop)]);
}

export default saga;

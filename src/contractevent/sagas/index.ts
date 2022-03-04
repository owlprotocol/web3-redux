import { all, takeEvery, spawn } from 'typed-redux-saga/macro';
import getAssets from './getAssets';
import getPastLogs from './getPastLogs';
import subscribeLogsLoop from './subscribeLogs';
import { GET_PAST_LOGS, GET_ASSETS } from '../actions';

/** @internal */
export function* saga() {
    yield* all([takeEvery(GET_PAST_LOGS, getPastLogs), takeEvery(GET_ASSETS, getAssets), spawn(subscribeLogsLoop)]);
}

export default saga;

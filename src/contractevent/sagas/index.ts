import { all, takeEvery, spawn } from 'typed-redux-saga/macro';
import { GET_PAST_LOGS } from '../actions';
import getPastLogs from './getPastLogs';
import subscribeLogsLoop from './subscribeLogs';

/** @internal */
export function* saga() {
    yield* all([takeEvery(GET_PAST_LOGS, getPastLogs), spawn(subscribeLogsLoop)]);
}

export default saga;

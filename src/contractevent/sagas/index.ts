import { all, takeEvery } from 'typed-redux-saga/macro';
import { GET_PAST_LOGS } from '../actions';
import getPastLogs from './getPastLogs';

/** @internal */
export function* saga() {
    yield* all([takeEvery(GET_PAST_LOGS, getPastLogs)]);
}

export default saga;

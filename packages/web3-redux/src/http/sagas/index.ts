import { all, spawn } from 'typed-redux-saga';
import { watchHttpGetSaga } from './httpGet.js';

/** @internal */
export function* saga() {
    yield* all([spawn(watchHttpGetSaga)]);
}

export default saga;

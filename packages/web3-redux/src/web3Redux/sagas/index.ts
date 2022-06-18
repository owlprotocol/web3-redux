import { all, spawn } from 'typed-redux-saga';
import watchLoadDBSaga from './loadDBAll.js';

/** @internal */
export default function* saga() {
    yield* all([spawn(watchLoadDBSaga)]);
}

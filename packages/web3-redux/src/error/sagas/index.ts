import { all, spawn } from 'typed-redux-saga';
import ErrorCRUD from '../crud.js';

/** @internal */
export default function* rootSaga() {
    yield* all([spawn(ErrorCRUD.sagas.crudRootSaga)]);
}

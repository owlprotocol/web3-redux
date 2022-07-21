import { all, spawn } from 'typed-redux-saga';
import ConfigCRUD from '../crud.js';

/** @internal */
export function* rootSaga() {
    yield* all([spawn(ConfigCRUD.sagas.crudRootSaga)]);
}

export default rootSaga;

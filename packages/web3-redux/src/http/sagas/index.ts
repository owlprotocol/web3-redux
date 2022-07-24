import { all, spawn } from 'typed-redux-saga';
import { watchHttpGetSaga } from './httpGet.js';
import { HTTPCacheCRUD } from '../crud.js';

/** @internal */
export function* HTTPCacheSaga() {
    yield* all([spawn(HTTPCacheCRUD.sagas.crudRootSaga), spawn(watchHttpGetSaga)]);
}

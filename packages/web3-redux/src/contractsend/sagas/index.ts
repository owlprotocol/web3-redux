import { all, spawn } from 'typed-redux-saga';
import ContractSendCRUD from '../crud.js';

/** @internal */
export function* rootSaga() {
    yield* all([spawn(ContractSendCRUD.sagas.crudRootSaga)]);
}

export default rootSaga;

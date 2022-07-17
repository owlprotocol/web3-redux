import { all, spawn } from 'typed-redux-saga';
import ContractEventQueryCRUD from '../crud.js';

/** @internal */
export function* saga() {
    yield* all([spawn(ContractEventQueryCRUD.sagas.crudRootSaga)]);
}

export default saga;

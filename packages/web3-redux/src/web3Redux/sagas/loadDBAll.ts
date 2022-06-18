import { put, takeEvery, all } from 'typed-redux-saga';
import { loadDBAllAction as loadBlockDB } from '../../block/actions/index.js';
import { loadDBAllAction as loadContractDB } from '../../contract/actions/index.js';
import { loadDBAllAction as loadContractEventDB } from '../../contractevent/actions/index.js';
import { loadDBAllAction as loadEthCallDB } from '../../ethcall/actions/index.js';
import { loadDBAllAction as loadHttpDB } from '../../http/actions/index.js';
import { loadDBAllAction as loadIpfsDB } from '../../ipfs/actions/index.js';
import { loadDBAllAction as loadNetworkDB } from '../../network/actions/index.js';
import { loadDBAllAction as loadTransactionDB } from '../../transaction/actions/index.js';

import { LoadDBAllAction, LOAD_DB_ALL } from '../actions/index.js';

/** Load DB data */
export function* loadDBAllSaga(action: LoadDBAllAction) {
    const actionCreators = [
        loadBlockDB,
        loadContractDB,
        loadContractEventDB,
        loadEthCallDB,
        loadHttpDB,
        loadIpfsDB,
        loadNetworkDB,
        loadTransactionDB,
    ];
    yield* all(actionCreators.map((fn) => put(fn(action.meta.uuid))));
}

export function* watchLoadDBSaga() {
    yield* takeEvery(LOAD_DB_ALL, loadDBAllSaga);
}

export default watchLoadDBSaga;

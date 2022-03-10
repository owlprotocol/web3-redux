import { all, spawn } from 'typed-redux-saga/macro';

import networkSaga from './network/sagas/index.js';
import blockSaga from './block/sagas/index.js';
import transactionSaga from './transaction/sagas/index.js';
import contractSaga from './contract/sagas/index.js';
import eventSaga from './contractevent/sagas/index.js';
import ethCallSaga from './ethcall/sagas/index.js';
import syncSaga from './sync/sagas/index.js';
import ipfsSaga from './ipfs/sagas/index.js';
import _4ByteSaga from './4byte/sagas/index.js';

//https://redux-saga.js.org/docs/advanced/RootSaga.html
export function* rootSaga() {
    yield* all([
        spawn(networkSaga),
        spawn(blockSaga),
        spawn(transactionSaga),
        spawn(contractSaga),
        spawn(eventSaga),
        spawn(ethCallSaga),
        spawn(syncSaga),
        spawn(ipfsSaga),
        spawn(_4ByteSaga),
    ]);
}

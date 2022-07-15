import { all, spawn } from 'typed-redux-saga';

import _4ByteSaga from './4byte/sagas/index.js';
import blockSaga from './block/sagas/index.js';
import configSaga from './config/sagas/index.js';
import contractSaga from './contract/sagas/index.js';
import contractEventSaga from './contractevent/sagas/index.js';
import contractEventQuerySaga from './contracteventquery/sagas/index.js';
import contractSendSaga from './contractsend/sagas/index.js';
import reduxErrorSaga from './error/sagas/index.js';
import ethCallSaga from './ethcall/sagas/index.js';
import HTTPCacheSaga from './http/sagas/index.js';
import IPFSCacheSaga from './ipfs/sagas/index.js';
import networkSaga from './network/sagas/index.js';
import syncSaga from './sync/sagas/index.js';
import transactionSaga from './transaction/sagas/index.js';

import Web3ReduxSaga from './web3Redux/sagas/index.js';

//https://typed-redux-saga.js.org/docs/advanced/RootSaga.html
export function* rootSaga() {
    yield* all([
        spawn(_4ByteSaga),
        spawn(blockSaga),
        spawn(configSaga),
        spawn(contractSaga),
        spawn(contractEventSaga),
        spawn(contractEventQuerySaga),
        spawn(contractSendSaga),
        spawn(reduxErrorSaga),
        spawn(ethCallSaga),
        spawn(HTTPCacheSaga),
        spawn(IPFSCacheSaga),
        spawn(networkSaga),
        spawn(syncSaga),
        spawn(transactionSaga),
        spawn(Web3ReduxSaga),
    ]);
}

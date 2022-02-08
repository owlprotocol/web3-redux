import { all, spawn } from 'typed-redux-saga/macro';

import networkSaga from './network/sagas';
import blockSaga from './block/sagas';
import transactionSaga from './transaction/sagas';
import { saga as contractSaga } from './contract/sagas';
import ethCallSaga from './ethcall/sagas';
import { saga as syncSaga } from './sync/sagas';
import _4ByteSaga from './4byte/sagas';

//https://redux-saga.js.org/docs/advanced/RootSaga.html
export function* rootSaga() {
    yield* all([
        spawn(networkSaga),
        spawn(blockSaga),
        spawn(transactionSaga),
        spawn(contractSaga),
        spawn(ethCallSaga),
        spawn(syncSaga),
        spawn(_4ByteSaga),
    ]);
}

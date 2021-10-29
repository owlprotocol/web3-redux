import { all, spawn } from 'typed-redux-saga/macro';

import { saga as blockSaga } from './block/sagas';
import { saga as transactionSaga } from './transaction/sagas';
import { saga as contractSaga } from './contract/sagas';
import { saga as ethCallSaga } from './ethcall/sagas';
import { saga as web3ReduxSaga } from './web3Redux/sagas';
import { saga as accountSaga } from './account/sagas';
import { saga as syncSaga } from './sync/sagas';

//https://redux-saga.js.org/docs/advanced/RootSaga.html
export function* rootSaga() {
    yield* all([
        spawn(blockSaga),
        spawn(transactionSaga),
        spawn(contractSaga),
        spawn(ethCallSaga),
        spawn(web3ReduxSaga),
        spawn(accountSaga),
        spawn(syncSaga),
    ]);
}

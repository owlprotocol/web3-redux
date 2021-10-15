import { all, spawn } from 'redux-saga/effects';

import { saga as blockSaga } from './block/sagas';
import { saga as transactionSaga } from './transaction/sagas';
import { saga as contractSaga } from './contract/sagas';
import { saga as ethCallSaga } from './ethcall/sagas';
import { saga as web3ReduxSaga } from './web3Redux/sagas';

//https://redux-saga.js.org/docs/advanced/RootSaga.html
export function* rootSaga() {
    yield all([
        spawn(blockSaga),
        spawn(transactionSaga),
        spawn(contractSaga),
        spawn(ethCallSaga),
        spawn(web3ReduxSaga),
    ]);
}

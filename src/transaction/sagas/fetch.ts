import { put, call } from 'typed-redux-saga/macro';
import { create as createTransaction, FetchAction } from '../actions';
import networkExists from '../../network/sagas/exists';

function* fetch(action: FetchAction) {
    const { payload } = action;
    const { networkId, hash } = payload;

    const network = yield* call(networkExists, networkId);
    if (!network.web3) throw new Error(`Network ${networkId} missing web3`);

    yield* put(createTransaction({ networkId, hash }));
    const web3 = network.web3;
    const transaction = yield* call(web3.eth.getTransaction, hash);
    const newTransaction = { ...transaction, networkId };
    yield* put(createTransaction(newTransaction));
}

export default fetch;

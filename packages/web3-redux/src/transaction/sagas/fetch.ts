import { put, call, select } from 'typed-redux-saga/macro';
import { create as createTransaction, update as updateTransaction, FetchAction } from '../actions/index.js';
import networkExists from '../../network/sagas/exists.js';
import { selectByIdSingle } from '../selectors/index.js';

function* fetch(action: FetchAction) {
    const { payload } = action;
    const { networkId, hash } = payload;

    const tx = yield* select(selectByIdSingle, { networkId, hash });
    if (!tx) yield* put(createTransaction({ networkId, hash }));

    const network = yield* call(networkExists, networkId);
    const web3 = network.web3;
    if (!web3) throw new Error(`Network ${networkId} missing web3`);

    const transaction = yield* call(web3.eth.getTransaction, hash);
    const newTransaction = { ...transaction, networkId };
    yield* put(updateTransaction(newTransaction));
}

export default fetch;

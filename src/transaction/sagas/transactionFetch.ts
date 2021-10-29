import { put, call, takeEvery } from 'typed-redux-saga/macro';
import { create as createTransaction, isFetchAction, FetchAction } from '../actions';
import networkExists from '../../network/sagas/networkExists';

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

function* fetchLoop() {
    const cache: { [key: string]: boolean } = {};

    const actionPattern = (action: { type: string }) => {
        if (!isFetchAction(action)) return false;
        const actionId = `${action.payload.networkId}-${action.payload.hash}`;
        if (cache[actionId]) return false;
        cache[actionId] = true;
        return true;
    };

    yield* takeEvery(actionPattern, fetch);
}

export default fetchLoop;

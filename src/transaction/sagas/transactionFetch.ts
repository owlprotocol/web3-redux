import { put, call, takeEvery } from 'redux-saga/effects';
import { Transaction } from '../model';
import { create as createTransaction, isFetchAction, FetchAction } from '../actions';
import networkExists from '../../network/sagas/networkExists';
import { Network } from '../../network/model';

function* fetch(action: FetchAction) {
    const { payload } = action;
    const { networkId, hash } = payload;

    const network: Network = yield call(networkExists, networkId);
    if (!network.web3) throw new Error(`Network ${networkId} missing web3`);

    yield put(createTransaction({ networkId, hash }));
    const web3 = network.web3;
    const transaction: Transaction = yield call(web3.eth.getTransaction, hash);
    const newTransaction = { ...transaction, networkId };
    yield put(createTransaction(newTransaction));
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

    yield takeEvery(actionPattern, fetch);
}

export default fetchLoop;

import { put, select, call, takeEvery } from 'redux-saga/effects';
import { selectByIdSingle as selectNetworkByIdSingle } from '../../network/selector';
import { Transaction } from '../model';
import { create as createTransaction, isFetchAction, FetchAction } from '../actions';

function* fetch(action: FetchAction) {
    const { payload } = action;
    const network: ReturnType<typeof selectNetworkByIdSingle> = yield select(
        selectNetworkByIdSingle,
        payload.networkId,
    );
    if (!network)
        throw new Error(
            `Could not find Network with id ${payload.networkId}. Make sure to dispatch a Network/CREATE action.`,
        );
    yield put(createTransaction({ networkId: payload.networkId, hash: payload.hash }));
    const web3 = network.web3;
    const transaction: Transaction = yield call(web3.eth.getTransaction, payload.hash);
    const newTransaction = { ...transaction, networkId: payload.networkId };
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

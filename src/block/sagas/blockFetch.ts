import { put, call, takeEvery } from 'redux-saga/effects';
import { BlockTransaction } from '../model';
import { create, FetchAction, isFetchAction } from '../actions';
import networkExists from '../../network/sagas/networkExists';

export function* fetch(action: FetchAction) {
    const { payload } = action;
    const { networkId } = payload;
    //@ts-ignore
    const network: Network = yield call(networkExists, networkId);

    const web3 = network.web3;
    const block: BlockTransaction = yield call(
        web3.eth.getBlock,
        payload.blockHashOrBlockNumber,
        payload.returnTransactionObjects ?? true,
    );
    yield put(create({ ...block, networkId }));
}

function* fetchLoop() {
    const cache: { [key: string]: boolean } = {};

    const actionPattern = (action: { type: string }) => {
        if (!isFetchAction(action)) return false;
        if (action.payload.blockHashOrBlockNumber === 'latest') return true;
        if (action.payload.blockHashOrBlockNumber === 'pending') return true;
        if (action.payload.blockHashOrBlockNumber === 'earliest') return true;

        const actionId = `${action.payload.networkId}-${action.payload.blockHashOrBlockNumber}`;
        if (cache[actionId]) return false;
        cache[actionId] = true;
        return true;
    };

    yield takeEvery(actionPattern, fetch);
}

export default fetchLoop;

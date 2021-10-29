import { put, call, takeEvery } from 'typed-redux-saga/macro';
import { create, update, FetchAction, isFetchAction } from '../actions';
import networkExists from '../../network/sagas/networkExists';

export function* fetch(action: FetchAction, updateBlock = false) {
    const { payload } = action;
    const { networkId } = payload;
    const network = yield* call(networkExists, networkId);
    if (!network.web3) throw new Error(`Network ${networkId} missing web3`);

    const web3 = network.web3;
    const block = yield* call(
        web3.eth.getBlock,
        payload.blockHashOrBlockNumber,
        payload.returnTransactionObjects ?? true,
    );
    if (!updateBlock) {
        yield* put(create({ ...block, networkId }));
    } else {
        yield* put(update({ ...block, networkId }));
    }
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

    yield* takeEvery(actionPattern, fetch);
}

export default fetchLoop;

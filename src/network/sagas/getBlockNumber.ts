import { put, call } from 'typed-redux-saga/macro';
import { set as setAction, GetBlockNumberAction } from '../actions';
import networkExists from './exists';

function* getBlockNumber(action: GetBlockNumberAction) {
    const { payload } = action;
    const networkId = payload;

    const network = yield* call(networkExists, networkId);
    if (!network.web3) throw new Error(`Network ${networkId} missing web3`);

    const web3 = network.web3;
    const latestBlockNumber = yield* call(web3.eth.getBlockNumber);
    yield* put(setAction({ id: networkId, key: 'latestBlockNumber', value: latestBlockNumber }));
}

export default getBlockNumber;
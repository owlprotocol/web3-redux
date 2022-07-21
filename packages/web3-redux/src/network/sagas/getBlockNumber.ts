import { put, call } from 'typed-redux-saga';
import loadNetwork from './loadNetwork.js';
import { GetBlockNumberAction } from '../actions/index.js';
import NetworkCRUD from '../crud.js';

function* getBlockNumber(action: GetBlockNumberAction) {
    const { payload } = action;
    const networkId = payload;

    const network = yield* call(loadNetwork, networkId, action.meta.uuid);
    if (!network) throw new Error(`Network ${networkId} undefined`);

    const web3 = network.web3 ?? network.web3Sender;
    if (!web3) throw new Error(`Network ${networkId} missing web3 or web3Sender`);

    const latestBlockNumber = yield* call(web3.eth.getBlockNumber);
    yield* put(NetworkCRUD.actions.update({ networkId, latestBlockNumber }, action.meta.uuid));
}

export default getBlockNumber;

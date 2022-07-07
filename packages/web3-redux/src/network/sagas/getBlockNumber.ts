import { put, call, select } from 'typed-redux-saga';
import { GetBlockNumberAction } from '../actions/index.js';
import NetworkCRUD from '../crud.js';

function* getBlockNumber(action: GetBlockNumberAction) {
    const { payload } = action;
    const networkId = payload;

    const network = yield* select(NetworkCRUD.selectors.selectByIdSingle, { networkId });
    if (!network) throw new Error(`Network ${networkId} undefined`);

    const web3 = network.web3 ?? network.web3Sender;
    if (!web3) throw new Error(`Network ${networkId} missing web3 or web3Sender`);

    const latestBlockNumber = yield* call(web3.eth.getBlockNumber);
    yield* put(NetworkCRUD.actions.update({ networkId, latestBlockNumber }));
}

export default getBlockNumber;

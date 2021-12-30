import { put, call } from 'typed-redux-saga/macro';
import { create, update, FetchAction } from '../actions';
import networkExists from '../../network/sagas/exists';

/** @category Sagas */
function* fetch(action: FetchAction, updateBlock = false) {
    const { payload } = action;
    const { networkId, blockHashOrBlockNumber, returnTransactionObjects } = payload;

    const network = yield* call(networkExists, networkId);
    const web3 = network.web3;
    if (!web3) throw new Error(`Network ${networkId} missing web3`);

    const block = yield* call(
        web3.eth.getBlock,
        blockHashOrBlockNumber,
        returnTransactionObjects ?? true, //default to true
    );
    if (!updateBlock) {
        //@ts-expect-error block has transactions
        yield* put(create({ ...block, networkId }));
    } else {
        yield* put(update({ ...block, networkId }));
    }
}

export default fetch;

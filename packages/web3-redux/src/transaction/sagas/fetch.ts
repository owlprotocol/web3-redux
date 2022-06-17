import { put, call, select } from 'typed-redux-saga';
import { selectByIdSingle as selectNetwork } from '../../network/selectors/index.js';
import { createAction as createTransaction, updateAction as updateTransaction, FetchAction } from '../actions/index.js';
import { selectByIdSingle } from '../selectors/index.js';

function* fetch(action: FetchAction) {
    const { payload } = action;
    const { networkId, hash } = payload;

    const tx = yield* select(selectByIdSingle, { networkId, hash });
    if (!tx) yield* put(createTransaction({ networkId, hash }));

    const network = yield* select(selectNetwork, networkId);
    if (!network) throw new Error(`Network ${networkId} undefined`);

    if (!network.web3 && !network.web3Sender) throw new Error(`Network ${networkId} missing web3 or web3Sender`);
    const web3 = network.web3 ?? network.web3Sender!;

    const transaction = yield* call(web3.eth.getTransaction, hash);
    const newTransaction = { ...transaction, networkId };
    yield* put(updateTransaction(newTransaction));
}

export default fetch;

import { select, put, call } from 'typed-redux-saga';
import networkExists from '../../network/sagas/exists.js';
import { set, create, GetNonceAction } from '../actions/index.js';
import { selectByIdSingle } from '../selectors/index.js';

/** @category Sagas */
export function* getNonce(action: GetNonceAction) {
    const { payload } = action;
    const { networkId, address } = payload;

    const account = yield* select(selectByIdSingle, { networkId, address });
    if (!account) yield* put(create({ networkId, address }));

    const network = yield* call(networkExists, networkId);
    const web3 = network.web3;
    const web3Sender = network.web3Sender;
    if (!web3 && !web3Sender) throw new Error(`Network ${networkId} missing web3`);

    //@ts-expect-error
    const nonce: string = yield* call((web3 ?? web3Sender).eth.getTransactionCount, address);
    yield* put(set({ id: { networkId, address }, key: 'nonce', value: nonce }));
}

export default getNonce;

import { select, put, call } from 'typed-redux-saga';
import { selectByIdSingle as selectNetwork } from '../../network/selectors/index.js';
import { set, createAction, GetNonceAction } from '../actions/index.js';
import { selectByIdSingle } from '../selectors/index.js';

/** @category Sagas */
export function* getNonce(action: GetNonceAction) {
    const { payload } = action;
    const { networkId, address } = payload;

    const account = yield* select(selectByIdSingle, { networkId, address });
    if (!account) yield* put(createAction({ networkId, address }));

    const network = yield* select(selectNetwork, networkId);
    if (!network) throw new Error(`Network ${networkId} undefined`);

    if (!network.web3 && !network.web3Sender) throw new Error(`Network ${networkId} missing web3 or web3Sender`);
    const web3 = network.web3 ?? network.web3Sender!;

    //@ts-expect-error
    const nonce: string = yield* call((web3 ?? web3Sender).eth.getTransactionCount, address);
    yield* put(set({ id: { networkId, address }, key: 'nonce', value: nonce }));
}

export default getNonce;

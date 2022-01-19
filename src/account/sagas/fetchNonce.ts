import { put, call } from 'typed-redux-saga/macro';
import networkExists from '../../network/sagas/exists';
import { set, FetchNonceAction } from '../actions';
import exists from './exists';

/** @category Sagas */
export function* fetchNonce(action: FetchNonceAction) {
    const { payload } = action;
    const { networkId, address } = payload;

    yield* call(exists, payload);
    const network = yield* call(networkExists, networkId);
    const web3 = network.web3;
    const web3Sender = network.web3Sender;
    if (!web3 && !web3Sender) throw new Error(`Network ${networkId} missing web3`);

    //@ts-expect-error
    const nonce: string = yield* call((web3 ?? web3Sender).eth.getTransactionCount, address);
    yield* put(set({ id: { networkId, address }, key: 'nonce', value: nonce }));
}

export default fetchNonce;

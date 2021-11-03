import { put, call } from 'typed-redux-saga/macro';
import networkExists from '../../network/sagas/exists';
import { getIdDeconstructed } from '../model/interface';
import { set, FetchNonceAction } from '../actions';
import exists from './exists';

export function* fetchNonce(action: FetchNonceAction) {
    const { payload } = action;
    yield* call(exists, payload);

    const { networkId, address } = getIdDeconstructed(payload);
    const network = yield* call(networkExists, networkId);
    const web3 = network.web3;
    if (!web3) throw new Error(`Network ${networkId} missing web3`);

    //@ts-expect-error
    const nonce: string = yield* call(web3.eth.getTransactionCount, address);
    yield* put(set({ id: payload, key: 'nonce', value: nonce }));
}

export default fetchNonce;

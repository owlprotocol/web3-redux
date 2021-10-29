import { put, call } from 'redux-saga/effects';
import { Network } from '../../network/model';
import networkExists from '../../network/sagas/networkExists';
import { getIdDeconstructed } from '../model/interface';
import { set, FetchNonceAction } from '../actions';
import exists from './exists';

export function* fetchNonce(action: FetchNonceAction) {
    const { payload } = action;
    const { networkId, address } = getIdDeconstructed(payload);
    const network: Network = yield call(networkExists, networkId);
    if (!network.web3) throw new Error(`Network ${networkId} missing web3`);
    yield call(exists, payload);

    const web3 = network.web3;
    //@ts-expect-error
    const nonce: string = yield call(web3.eth.getTransactionCount, address);
    yield put(set({ id: payload, key: 'nonce', value: nonce }));
}

export default fetchNonce;

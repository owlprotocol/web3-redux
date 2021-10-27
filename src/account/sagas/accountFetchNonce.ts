import { put, call } from 'redux-saga/effects';
import networkExists from '../../network/sagas/networkExists';
import { set, FetchNonceAction } from '../actions';
import accountExists from './accountExists';

export function* fetchNonce(action: FetchNonceAction) {
    const { payload } = action;
    const { networkId, address } = payload;
    //@ts-ignore
    const network: Network = yield call(networkExists, networkId);
    yield call(accountExists, networkId, address);

    const web3 = network.web3;
    const nonce: string = yield call(web3.eth.getTransactionCount, address);
    yield put(set({ networkId, address, key: 'nonce', value: nonce }));
}

export default fetchNonce;

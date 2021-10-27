import { put, call } from 'redux-saga/effects';
import networkExists from '../../network/sagas/networkExists';
import { update, FetchNonceAction } from '../actions';
import { Account } from '../model';
import accountExists from './accountExists';

export function* fetchNonce(action: FetchNonceAction) {
    const { payload } = action;
    const { networkId, address } = payload;
    //@ts-ignore
    const network: Network = yield call(networkExists, networkId);
    const account: Account = yield call(accountExists, networkId, address);

    const web3 = network.web3;
    const nonce: string = yield call(web3.eth.getTransactionCount, address);
    yield put(update({ ...account, nonce }));
}

export default fetchNonce;

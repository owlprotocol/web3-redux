import { put, call } from 'redux-saga/effects';
import networkExists from '../../network/sagas/networkExists';
import { set, FetchBalanceAction } from '../actions';
import accountExists from './accountExists';

export function* fetchBalance(action: FetchBalanceAction) {
    const { payload } = action;
    const { networkId, address } = payload;
    //@ts-ignore
    const network: Network = yield call(networkExists, networkId);
    yield call(accountExists, networkId, address);

    const web3 = network.web3;
    const balance: string = yield call(web3.eth.getBalance, address);
    yield put(set({ networkId, address, key: 'balance', value: balance }));
}

export default fetchBalance;

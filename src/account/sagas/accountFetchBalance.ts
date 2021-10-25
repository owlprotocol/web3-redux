import { put, call } from 'redux-saga/effects';
import networkExists from '../../network/sagas/networkExists';
import { create, FetchBalanceAction } from '../actions';
import { Account } from '../model';
import accountExists from './accountExists';

export function* fetchBalance(action: FetchBalanceAction) {
    const { payload } = action;
    const { networkId, address } = payload;
    //@ts-ignore
    const network: Network = yield call(networkExists, networkId);
    const account: Account = yield call(accountExists, networkId, address);

    const web3 = network.web3;
    const balance: string = yield call(web3.eth.getBalance, address);
    yield put(create({ ...account, balance }));
}

export default fetchBalance;

import { put, call } from 'typed-redux-saga/macro';
import networkExists from '../../network/sagas/exists';
import { set, FetchBalanceAction } from '../actions';
import exists from './exists';

/** @category Sagas */
export function* fetchBalance(action: FetchBalanceAction) {
    const { payload } = action;
    const { networkId, address } = payload;

    yield* call(exists, payload);
    const network = yield* call(networkExists, networkId);
    const web3 = network.web3;
    const web3Sender = network.web3Sender;
    if (!web3 && !web3Sender) throw new Error(`Network ${networkId} missing web3 or web3Sender`);

    //@ts-expect-error
    const balance: string = yield* call((web3 ?? web3Sender).eth.getBalance, address);
    yield* put(set({ id: { networkId, address }, key: 'balance', value: balance }));
}

export default fetchBalance;

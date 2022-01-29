import { select, put, call } from 'typed-redux-saga/macro';
import networkExists from '../../network/sagas/exists';
import { set, create, GetBalanceAction } from '../actions';
import { selectByIdSingle } from '../selectors';

/** @category Sagas */
export function* getBalance(action: GetBalanceAction) {
    const { payload } = action;
    const { networkId, address } = payload;

    const account = yield* select(selectByIdSingle, { networkId, address });
    if (!account) yield* put(create({ networkId, address }));

    const network = yield* call(networkExists, networkId);
    const web3 = network.web3;
    const web3Sender = network.web3Sender;
    if (!web3 && !web3Sender) throw new Error(`Network ${networkId} missing web3 or web3Sender`);

    //@ts-expect-error
    const balance: string = yield* call((web3 ?? web3Sender).eth.getBalance, address);
    yield* put(set({ id: { networkId, address }, key: 'balance', value: balance }));
}

export default getBalance;

import { select, put, call } from 'typed-redux-saga/macro';
import networkExists from '../../network/sagas/exists.js';
import { set, create, GetBalanceAction } from '../actions/index.js';
import { selectByIdSingle } from '../selectors/index.js';

/** @category Sagas */
export function* getBalance(action: GetBalanceAction) {
    const { payload } = action;
    const { networkId, address } = payload;

    const account = yield* select(selectByIdSingle, { networkId, address });
    if (!account) yield* put(create({ networkId, address }));

    const network = yield* call(networkExists, networkId);
    const web3 = network.web3 ?? network.web3Sender;
    if (!web3) throw new Error(`Network ${networkId} missing web3 or web3Sender`);

    //@ts-expect-error
    const balance: string = yield* call(web3.eth.getBalance, address);
    yield* put(set({ id: { networkId, address }, key: 'balance', value: balance }));
}

export default getBalance;

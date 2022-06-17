import { select, put, call } from 'typed-redux-saga';
import { selectByIdSingle as selectNetwork } from '../../network/selectors/index.js';
import { set, createAction, GetBalanceAction } from '../actions/index.js';
import { selectByIdSingle } from '../selectors/index.js';

/** @category Sagas */
export function* getBalance(action: GetBalanceAction) {
    const { payload } = action;
    const { networkId, address } = payload;

    const account = yield* select(selectByIdSingle, { networkId, address });
    if (!account) yield* put(createAction({ networkId, address }));

    const network = yield* select(selectNetwork, networkId);
    if (!network) throw new Error(`Network ${networkId} undefined`);

    const web3 = network.web3 ?? network.web3Sender;
    if (!web3) throw new Error(`Network ${networkId} missing web3 or web3Sender`);

    //@ts-expect-error
    const balance: string = yield* call(web3.eth.getBalance, address);
    yield* put(set({ id: { networkId, address }, key: 'balance', value: balance }));
}

export default getBalance;

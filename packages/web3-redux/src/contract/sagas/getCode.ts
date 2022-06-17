import { select, put, call } from 'typed-redux-saga';
import { selectByIdSingle as selectNetwork } from '../../network/selectors/index.js';
import { set, createAction, GetCodeAction } from '../actions/index.js';
import { selectByIdSingle } from '../selectors/index.js';

/** @category Sagas */
export function* getCode(action: GetCodeAction) {
    const { payload } = action;
    const { networkId, address } = payload;

    const account = yield* select(selectByIdSingle, { networkId, address });
    if (!account) yield* put(createAction({ networkId, address }));

    const network = yield* select(selectNetwork, networkId);
    if (!network) throw new Error(`Network ${networkId} undefined`);

    const web3 = network.web3;
    const web3Sender = network.web3Sender;
    if (!web3 && !web3Sender) throw new Error(`Network ${networkId} missing web3 or web3Sender`);

    //@ts-expect-error
    const code: string = yield* call((web3 ?? web3Sender).eth.getCode, address);
    yield* put(set({ id: { networkId, address }, key: 'code', value: code }));
}

export default getCode;

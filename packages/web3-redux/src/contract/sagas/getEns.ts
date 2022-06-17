import { select, put, call } from 'typed-redux-saga';
import ENS from 'ethereum-ens';
import { selectByIdSingle as selectNetwork } from '../../network/selectors/index.js';
import { set, createAction, GetEnsAction } from '../actions/index.js';
import { selectByIdSingle } from '../selectors/index.js';
//@ts-ignore

/** @category Sagas */
export function* getEns(action: GetEnsAction) {
    const { payload } = action;
    const { networkId, address } = payload;

    const account = yield* select(selectByIdSingle, { networkId, address });
    if (!account) yield* put(createAction({ networkId, address }));

    const network = yield* select(selectNetwork, networkId);
    if (!network) throw new Error(`Network ${networkId} undefined`);

    const web3 = network.web3;
    const web3Sender = network.web3Sender;
    if (!web3 && !web3Sender) throw new Error(`Network ${networkId} missing web3 or web3Sender`);

    const ens = new ENS(web3?.currentProvider);
    const ensName = yield* call(ens.reverse(address).name);

    yield* put(set({ id: { networkId, address }, key: 'ens', value: ensName }));
}

export default getEns;

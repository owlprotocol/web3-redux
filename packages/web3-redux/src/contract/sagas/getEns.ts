import { select, put, call } from 'typed-redux-saga';
import ENS from 'ethereum-ens';
import { GetEnsAction } from '../actions/index.js';
import ContractCRUD from '../crud.js';
import loadNetwork from '../../network/sagas/loadNetwork.js';

/** @category Sagas */
export function* getEns(action: GetEnsAction) {
    const { payload } = action;
    const { networkId, address } = payload;

    const network = yield* call(loadNetwork, networkId);
    if (!network) throw new Error(`Network ${networkId} undefined`);

    const web3 = network.web3 ?? network.web3Sender;
    if (!web3) throw new Error(`Network ${networkId} missing web3 or web3Sender`);

    const contract = yield* select(ContractCRUD.selectors.selectByIdSingle, { networkId, address });
    if (!contract) yield* put(ContractCRUD.actions.upsert({ networkId, address }));

    const ens = new ENS(web3?.currentProvider);
    const ensName = yield* call(ens.reverse(address).name);

    yield* put(ContractCRUD.actions.update({ networkId, address, ens: ensName as string }));
}

export default getEns;

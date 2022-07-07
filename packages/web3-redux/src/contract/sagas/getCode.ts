import { select, put, call } from 'typed-redux-saga';
import NetworkCRUD from '../../network/crud.js';
import { GetCodeAction } from '../actions/index.js';
import ContractCRUD from '../crud.js';

/** @category Sagas */
export function* getCode(action: GetCodeAction) {
    const { payload } = action;
    const { networkId, address } = payload;

    const network = yield* select(NetworkCRUD.selectors.selectByIdSingle, { networkId });
    if (!network) throw new Error(`Network ${networkId} undefined`);

    const web3 = network.web3 ?? network.web3Sender;
    if (!web3) throw new Error(`Network ${networkId} missing web3 or web3Sender`);

    const contract = yield* select(ContractCRUD.selectors.selectByIdSingle, { networkId, address });
    if (!contract) yield* put(ContractCRUD.actions.create({ networkId, address }));

    //@ts-expect-error
    const code: string = yield* call((web3 ?? web3Sender).eth.getCode, address);
    yield* put(ContractCRUD.actions.update({ networkId, address, code }));
}

export default getCode;

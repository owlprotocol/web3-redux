import { select, put, call } from 'typed-redux-saga';
import NetworkCRUD from '../../network/crud.js';
import { GetBalanceAction } from '../actions/getBalance.js';
import ContractCRUD from '../crud.js';

/** @category Sagas */
export function* getBalance(action: GetBalanceAction) {
    const { payload } = action;
    const { networkId, address } = payload;

    const network = yield* select(NetworkCRUD.selectors.selectByIdSingle, { networkId });
    if (!network) throw new Error(`Network ${networkId} undefined`);

    const web3 = network.web3 ?? network.web3Sender;
    if (!web3) throw new Error(`Network ${networkId} missing web3 or web3Sender`);

    const contract = yield* select(ContractCRUD.selectors.selectByIdSingle, { networkId, address });
    if (!contract) yield* put(ContractCRUD.actions.create({ networkId, address }));

    //@ts-expect-error
    const balance: string = yield* call(web3.eth.getBalance, address);
    yield* put(ContractCRUD.actions.update({ networkId, address, balance }));
}

export default getBalance;

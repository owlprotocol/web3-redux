import { ReducerAction, isCreateAction, isRemoveAction, isUpdateAction, isSetAction } from './actions';
import { getId, Contract } from './model';
import { Network } from '../network/model';
import ModelInterface from '../types/model';

/** @internal */
export function reducer(sess: any, action: ReducerAction) {
    const Network: ModelInterface<Network> = sess.Network;
    const Contract: ModelInterface<Contract> = sess.Contract;

    if (isCreateAction(action)) {
        const { payload } = action;
        const { abi, address } = payload;
        const network: Network = Network.withId(payload.networkId);
        const { web3, web3Sender } = network ?? {};

        const web3Contract = payload.web3Contract ?? (web3 && abi ? new web3.eth.Contract(abi, address) : undefined);
        const web3SenderContract =
            payload.web3SenderContract ?? (web3Sender && abi ? new web3Sender.eth.Contract(abi, address) : undefined);

        const insertData = { ...payload };
        if (web3Contract) insertData.web3Contract = web3Contract;
        if (web3SenderContract) insertData.web3SenderContract = web3SenderContract;
        Contract.upsert(insertData);
    } else if (isRemoveAction(action)) {
        if (typeof action.payload === 'string') {
            Contract.withId(action.payload).delete();
        } else {
            Contract.withId(getId(action.payload)).delete();
        }
    } else if (isUpdateAction(action)) {
        Contract.update(action.payload);
    } else if (isSetAction(action)) {
        Contract.withId(action.payload.id)?.set(action.payload.key, action.payload.value);
    }

    return sess;
}

export default reducer;

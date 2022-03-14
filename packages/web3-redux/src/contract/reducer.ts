import { ReducerAction, isCreateAction, isRemoveAction, isUpdateAction, isSetAction } from './actions/index.js';
import { getId, Contract } from './model/index.js';
import { Network } from '../network/model/index.js';
import { ORMModel, ModelWithId } from '../types/model.js';

/** @internal */
export function reducer(sess: any, action: ReducerAction) {
    const Network: ORMModel<Network> = sess.Network;
    const Contract: ORMModel<ModelWithId<Contract>> = sess.Contract;

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

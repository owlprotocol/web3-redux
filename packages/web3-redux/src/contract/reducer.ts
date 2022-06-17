import {
    ReducerAction,
    isCreateAction,
    isCreateBatchedAction,
    isRemoveAction,
    isRemoveBatchedAction,
    isUpdateAction,
    isUpdateBatchedAction,
    isSetAction,
} from './actions/index.js';
import { getId, Contract } from './model/index.js';
import { Network } from '../network/model/index.js';
import { ORMModel, ModelWithId } from '../types/model.js';
import { ContractIndex } from '../contractindex/model/interface.js';

/** @internal */
export function reducer(sess: any, action: ReducerAction) {
    const Network: ORMModel<Network> = sess.Network;
    const Contract: ORMModel<ModelWithId<Contract>> = sess.Contract;
    const Index: ORMModel<ModelWithId<ContractIndex>> = sess.ContractIndex;

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
        action.payload.indexIds?.forEach((id) => {
            if (!Index.withId(id)) Index.create({ id });
        });
    } else if (isCreateBatchedAction(action)) {
        action.payload.forEach((item) => {
            Network.upsert(item);
        });
    } else if (isRemoveAction(action)) {
        if (typeof action.payload === 'string') {
            Contract.withId(action.payload).delete();
        } else {
            Contract.withId(getId(action.payload))?.delete();
        }
    } else if (isRemoveBatchedAction(action)) {
        action.payload.forEach((item) => {
            Contract.withId(getId(item))?.delete();
        });
    } else if (isUpdateAction(action)) {
        Contract.update(action.payload);
        action.payload.indexIds?.forEach((id) => {
            if (!Index.withId(id)) Index.create({ id });
        });
    } else if (isUpdateBatchedAction(action)) {
        action.payload.forEach((item) => {
            Contract.update(item);
            item.indexIds?.forEach((id) => {
                if (!Index.withId(id)) Index.create({ id });
            });
        });
    } else if (isSetAction(action)) {
        Contract.withId(action.payload.id)?.set(action.payload.key, action.payload.value);
        if (action.payload.key === 'indexIds') {
            (action.payload.value as string[])?.forEach((id) => {
                if (!Index.withId(id)) Index.create({ id });
            });
        }
    }

    return sess;
}

export default reducer;

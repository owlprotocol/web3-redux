import { ReducerAction, isCreateAction, isRemoveAction, isUpdateAction, isSetAction } from './actions';
import { getId } from './model';
import { Network } from '../network/model';

/** @internal */
export function reducer(sess: any, action: ReducerAction) {
    const { Contract, Network } = sess;

    if (isCreateAction(action)) {
        const { payload } = action;
        const network: Network = Network.withId(payload.networkId);
        const { web3, web3Sender } = network ?? { web3: undefined, web3Sender: undefined };

        const web3Contract =
            payload.web3Contract ??
            (web3 && payload.abi ? new web3.eth.Contract(payload.abi, payload.address) : undefined);
        const web3SenderContract =
            payload.web3SenderContract ??
            (web3Sender && payload.abi ? new web3Sender.eth.Contract(payload.abi, payload.address) : undefined);

        //@ts-expect-error ignore readonly
        payload.web3Contract = web3Contract;
        //@ts-expect-error ignore readonly
        payload.web3SenderContract = web3SenderContract;
        Contract.upsert(payload);
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

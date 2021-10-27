import { Action, isCreateAction, isRemoveAction, isUpdateAction } from './actions';
import Multicall from '../abis/Multicall.json';

export function reducer(sess: any, action: Action) {
    const Model = sess.Network;
    if (isCreateAction(action)) {
        const { payload } = action;
        if (payload.multicallContract) {
            payload.multicallAddress = payload.multicallContract.options.address;
        } else if (payload.multicallAddress) {
            payload.multicallContract = new payload.web3.eth.Contract(Multicall.abi as any, payload.multicallAddress);
        }

        if (!payload.gasLimit) payload.gasLimit = 12000000;
        Model.upsert(payload);
    } else if (isRemoveAction(action)) {
        Model.withId(action.payload).delete();
    } else if (isUpdateAction(action)) {
        //@ts-expect-error
        Model.update(action.payload);
    }

    return sess;
}

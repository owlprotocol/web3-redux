import { Contract as Web3Contract } from 'web3-eth-contract';
import { Action, isCreateAction, isRemoveAction } from './actions';
import Multicall from '../abis/Multicall.json';

export function reducer(sess: any, action: Action) {
    const Model = sess.Network;
    if (isCreateAction(action)) {
        const payload = { ...action.payload };
        if (!payload.web3Sender) payload.web3Sender = payload.web3;
        let multicallContract: Web3Contract | undefined;
        if (payload.multicallAddress)
            multicallContract = new payload.web3.eth.Contract(Multicall.abi as any, payload.multicallAddress);
        Model.upsert({ ...payload, multicallContract, gasLimit: payload.gasLimit ?? 12000000 });
    } else if (isRemoveAction(action)) {
        Model.withId(action.payload).delete();
    }

    return sess;
}

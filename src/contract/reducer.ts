import { ZERO_ADDRESS } from '../utils';
import { ReducerAction, isCreateAction, isRemoveAction, isCallUnsyncAction, CallUnsyncAction } from './actions';
import { validatedContract, contractId, callArgsHash } from './model';

export function reducer(sess: any, action: ReducerAction) {
    const { Contract, Network, Config } = sess;

    if (isCreateAction(action)) {
        const network = Network.withId(action.payload.networkId);
        if (!network)
            throw new Error(
                `Could not find Network with id ${action.payload.networkId}. Make sure to dispatch a Network/CREATE action.`,
            );

        const validated = validatedContract(action.payload);
        validated.web3Contract =
            validated.web3Contract ?? new network.web3.eth.Contract(validated.abi, validated.address);
        validated.web3SenderContract =
            validated.web3SenderContract ?? new network.web3Sender.eth.Contract(validated.abi, validated.address);
        Contract.upsert(validated);
    } else if (isRemoveAction(action)) {
        if (typeof action.payload === 'string') {
            Contract.withId(action.payload).delete();
        } else {
            Contract.withId(contractId(action.payload)).delete();
        }
    } else if (isCallUnsyncAction(action)) {
        const { payload } = action as CallUnsyncAction; //Why isn't this getting inferred?
        const networkId = payload.networkId ?? Config.withId(0).networkId;
        const contract = Contract.withId(contractId({ address: payload.address, networkId }));
        const from: string = payload.from ?? ZERO_ADDRESS;
        const defaultBlock = payload.defaultBlock ?? 'latest';
        const key = callArgsHash({ from, defaultBlock, args: payload.args });
        const call = contract.methods[payload.method][key];
        contract.methods[payload.method][key] = { ...call, sync: false };
    }
    return sess;
}

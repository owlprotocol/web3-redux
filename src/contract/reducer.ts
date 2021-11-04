import { ReducerAction, isCreateAction, isRemoveAction } from './actions';
import { validate, getId } from './model';
import { Network } from '../network/model';

export function reducer(sess: any, action: ReducerAction) {
    const { Contract, Network } = sess;

    if (isCreateAction(action)) {
        const network: Network = Network.withId(action.payload.networkId);
        if (!network)
            throw new Error(
                `Could not find Network with id ${action.payload.networkId}. Make sure to dispatch a Network/CREATE action.`,
            );

        const validated = validate(action.payload);
        //@ts-expect-error ignore readonly
        validated.web3Contract =
            validated.web3Contract ??
            (network.web3 ? new network.web3.eth.Contract(validated.abi!, validated.address) : undefined);
        //@ts-expect-error ignore readonly
        validated.web3SenderContract =
            validated.web3SenderContract ??
            (network.web3Sender ? new network.web3Sender.eth.Contract(validated.abi!, validated.address) : undefined);
        Contract.upsert(validated);
    } else if (isRemoveAction(action)) {
        if (typeof action.payload === 'string') {
            Contract.withId(action.payload).delete();
        } else {
            Contract.withId(getId(action.payload)).delete();
        }
    }

    return sess;
}

export default reducer;

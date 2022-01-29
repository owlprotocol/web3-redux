import { createTransform } from 'redux-persist';
import { omit, mapValues } from 'lodash';
import State from './state';

export const Web3ReduxTransform = createTransform(
    (inboundState: State) => {
        //Serialize everything to JSON except for the web3 objects
        return {
            ...inboundState,
            Network: {
                ...inboundState.Network,
                itemsById: mapValues(inboundState.Network.itemsById, (x) => omit(x, ['web3', 'web3Sender'])),
            },
            Contract: {
                ...inboundState.Contract,
                itemsById: mapValues(inboundState.Contract.itemsById, (x) =>
                    omit(x, ['web3Contract', 'web3SenderContract']),
                ),
            },
        };
    },
    (outboundState: State) => {
        //Rehydrate state
        //Network web3/web3Sender objects require browser context
        return { ...outboundState };
    },
);

export default Web3ReduxTransform;

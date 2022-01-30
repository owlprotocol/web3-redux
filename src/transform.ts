import { createTransform } from 'redux-persist';
import { omit, mapValues } from 'lodash';
import State from './state';

export const Web3ReduxTransform = createTransform(
    (inboundState: State) => {
        let Network = inboundState.Network;
        if (Network)
            Network = {
                ...Network,
                itemsById: mapValues(Network.itemsById, (x) => omit(x, ['web3', 'web3Sender'])),
            };

        let Contract = inboundState.Contract;
        if (Contract)
            Contract = {
                ...Contract,
                itemsById: mapValues(Contract.itemsById, (x) => omit(x, ['web3Contract', 'web3SenderContract'])),
            };

        const inboundStateShallowCopy = { ...inboundState };
        if (Network) inboundStateShallowCopy.Network = Network;
        if (Contract) inboundStateShallowCopy.Contract = Contract;
        //console.debug({ inboundState })
        //Serialize everything to JSON except for the web3 objects

        //console.debug(inboundStateShallowCopy)
        return inboundStateShallowCopy;
    },
    (outboundState: State) => {
        //console.debug({ outboundState })
        //Rehydrate state
        //Network web3/web3Sender objects require browser context
        return { ...outboundState };
    },
);

export default Web3ReduxTransform;

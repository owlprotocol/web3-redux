import { createTransform } from 'redux-persist';
import { omit, mapValues } from 'lodash';
import State from './state';

export const NetworkTransform = createTransform(
    (inboundState: State['Network']) => {
        return {
            ...inboundState,
            itemsById: mapValues(inboundState.itemsById, (x) => omit(x, ['web3', 'web3Sender'])),
        };
    },
    (outboundState: State['Network']) => {
        return { ...outboundState };
    },
    { whitelist: ['Network'] },
);

export const ContractTransform = createTransform(
    (inboundState: State['Contract']) => {
        return {
            ...inboundState,
            itemsById: mapValues(inboundState.itemsById, (x) => omit(x, ['web3Contract', 'web3SenderContract'])),
        };
    },
    (outboundState: State['Contract']) => {
        return { ...outboundState };
    },
    { whitelist: ['Contract'] },
);

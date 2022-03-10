import { createTransform } from 'redux-persist';
import { omit, mapValues } from 'lodash';
import Web3 from 'web3';
import { State } from './state.js';

export const NetworkTransform = createTransform(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (inboundState: State['Network'], _: string, __: State) => {
        return {
            ...inboundState,
            itemsById: mapValues(inboundState.itemsById, (x) => omit(x, ['web3', 'web3Sender'])),
        };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (outboundState: State['Network'], _: string, rawState: State) => {
        const out = {
            ...outboundState,
            itemsById: mapValues(outboundState.itemsById, (x) => {
                const copy = { ...x };
                if (x.web3Rpc) copy.web3 = new Web3(x.web3Rpc); //Re-build web3 object
                return copy;
            }),
        };

        rawState.Network = out; //apply modification
        return out;
    },
    { whitelist: ['Network'] },
);

export const ContractTransform = createTransform(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (inboundState: State['Contract'], _: string, __: State) => {
        return {
            ...inboundState,
            itemsById: mapValues(inboundState.itemsById, (x) => omit(x, ['web3Contract', 'web3SenderContract'])),
        };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (outboundState: State['Contract'], _: string, __: State) => {
        return {
            ...outboundState,
        };
    },
    { whitelist: ['Contract'] },
);

export const SyncTransform = createTransform(
    () => {
        return {
            indexes: {},
            items: [],
            itemsById: {},
        };
    },
    (outboundState: State['Sync']) => {
        return { ...outboundState };
    },
    { whitelist: ['Sync'] },
);

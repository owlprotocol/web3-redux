import { createTransform } from 'redux-persist';
import { omit, mapValues } from 'lodash';
import Web3 from 'web3';
import State from './state';

export const NetworkTransform = createTransform(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (inboundState: State['Network'], _: string, __: State) => {
        return {
            ...inboundState,
            itemsById: mapValues(inboundState.itemsById, (x) => omit(x, ['web3', 'web3Sender'])),
        };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (outboundState: State['Network'], _: string, __: State) => {
        return {
            ...outboundState,
            itemsById: mapValues(outboundState.itemsById, (x) => {
                const copy = { ...x };
                if (x.web3Rpc) copy.web3 = new Web3(x.web3Rpc); //Re-build web3 object
                return copy;
            }),
        };
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
    (outboundState: State['Contract'], _: string, rawState: State) => {
        return {
            ...outboundState,
            itemsById: mapValues(outboundState.itemsById, (x) => {
                const copy = { ...x };
                const networkWeb3 = rawState.Network?.itemsById[x.networkId]?.web3;
                if (networkWeb3 && x.abi) copy.web3Contract = new networkWeb3.eth.Contract(x.abi); //Re-build web3Contract object
                return copy;
            }),
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

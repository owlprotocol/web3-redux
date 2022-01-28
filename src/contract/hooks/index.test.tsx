import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import ganache from 'ganache-core';

import { Provider } from 'react-redux';

import BlockNumberAbi from '../../abis/BlockNumber.json';
import ERC165Abi from '../../abis/ERC165.json';

import { createStore, StoreType } from '../../store';
import { create as createNetwork } from '../../network/actions';
import { create } from '../actions';

export const networkId = '1337';
export const beforeFn = async () => {
    const provider = ganache.provider({
        networkId: parseInt(networkId),
    });
    const web3 = new Web3(provider as any);
    const accounts = await web3.eth.getAccounts();
    return { web3, accounts };
};
export const beforeEachFn = ({ web3 }: { web3: Web3 }) => {
    const store = createStore();
    store.dispatch(createNetwork({ networkId, web3 }));
    const wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    return { store, wrapper };
};

export const deployBlockNoContract = async ({ web3, from, store }: { web3: Web3; from: string; store: StoreType }) => {
    const tx = new web3.eth.Contract(BlockNumberAbi.abi as AbiItem[]).deploy({
        data: BlockNumberAbi.bytecode,
    });
    const gas = await tx.estimateGas();
    const web3Contract = await tx.send({ from, gas, gasPrice: '10000' });
    const address = web3Contract.options.address;

    store.dispatch(
        create({
            networkId,
            address,
            abi: BlockNumberAbi.abi as AbiItem[],
        }),
    );
    return { address, web3Contract };
};

export const deployERC165Contract = async ({ web3, from, store }: { web3: Web3; from: string; store: StoreType }) => {
    const tx = new web3.eth.Contract(ERC165Abi.abi as AbiItem[]).deploy({
        data: ERC165Abi.bytecode,
    });
    const gas = await tx.estimateGas();
    const web3Contract = await tx.send({ from, gas, gasPrice: '10000' });
    const address = web3Contract.options.address;

    store.dispatch(
        create({
            networkId,
            address,
            abi: ERC165Abi.abi as AbiItem[],
        }),
    );
    return { address };
};

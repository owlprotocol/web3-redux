import { assert } from 'chai';
import Web3 from 'web3';
import type { Contract as Web3Contract } from 'web3-eth-contract';
import { cloneDeep } from '../../utils/lodash/index.js';
import { AbiItem } from '../../utils/web3-utils/index.js';
import { getWeb3Provider } from '../../test/index.js';
import { sleep } from '../../utils/index.js';

import { name } from '../common.js';
import { networkId } from '../../test/data.js';

import { BlockNumberArtifact, MulticallArtifact } from '../../abis/index.js';

import { createStore, StoreType } from '../../store.js';

import { callBatched as callBatchedAction } from '../actions/index.js';
import NetworkCRUD from '../../network/crud.js';
import getContractCall from '../db/getContractCall.js';
import ContractCRUD from '../crud.js';

describe(`${name}.sagas.callBatched`, () => {
    let web3: Web3; //Web3 loaded from store
    let web3Sender: Web3;
    let accounts: string[];
    let store: StoreType;
    let web3Contract: Web3Contract;

    let address: string;

    /*
    let rpcLogger: ReturnType<typeof ganacheLogger>;
    let ethCall = 0;
    let rpcBatch = 0;
    */

    before(async () => {
        //rpcLogger = ganacheLogger();

        const provider = getWeb3Provider();
        //@ts-ignore
        web3 = new Web3(provider);
        //@ts-ignore
        web3Sender = new Web3(provider);
        accounts = await web3.eth.getAccounts();

        /*
        const ethCallIncr = () => (ethCall += 1);
        const rpcBatchIncr = () => (rpcBatch += 1);
        rpcLogger.addListener('eth_call', ethCallIncr);
        rpcLogger.addListener('rpc_batch', rpcBatchIncr);
        */
    });

    beforeEach(async () => {
        store = createStore();
        store.dispatch(NetworkCRUD.actions.create({ networkId, web3, web3Sender }));

        const tx = new web3.eth.Contract(cloneDeep(BlockNumberArtifact.abi) as AbiItem[]).deploy({
            data: BlockNumberArtifact.bytecode,
        });
        const gas = await tx.estimateGas();
        web3Contract = await tx.send({ from: accounts[0], gas, gasPrice: '875000000' });
        address = web3Contract.options.address;

        store.dispatch(
            ContractCRUD.actions.create({
                networkId,
                address,
                abi: cloneDeep(BlockNumberArtifact.abi) as AbiItem[],
            }),
        );
    });

    describe('callBatched', () => {
        it.skip('()', async () => {
            //const ethCallInitial = ethCall;
            //const rpcBatchInitial = rpcBatch;

            const tx2 = await web3Contract.methods.setValue(42);
            await tx2.send({ from: accounts[0], gas: await tx2.estimateGas() });
            await sleep(300);

            const expectedBlockNumber = await web3.eth.getBlockNumber();

            const ethCall1 = {
                address,
                method: 'getValue',
            };
            const ethCall2 = {
                address,
                method: 'blockNumber',
            };

            store.dispatch(callBatchedAction({ networkId, requests: [ethCall1, ethCall2] }));
            await sleep(300);

            //Selector
            const getValue = await getContractCall(store.getState(), networkId, address, 'getValue');

            const blockNumber = await getContractCall(store.getState(), networkId, address, 'blockNumber');

            assert.equal(getValue, 42, 'getValue');
            assert.equal(blockNumber, expectedBlockNumber, 'blockNumber');

            //assert.equal(rpcBatch - rpcBatchInitial, 1, 'rpc_batch rpc calls != expected');
            //While a batched rpc request, still logs 2 separate eth_call operations
            //assert.equal(ethCall - ethCallInitial, 2, 'eth_call rpc calls != expected');
        });

        it.skip('(multicall:true)', async () => {
            //const ethCallInitial = ethCall;
            //const rpcBatchInitial = rpcBatch;

            const tx2 = await web3Contract.methods.setValue(42);
            await tx2.send({ from: accounts[0], gas: await tx2.estimateGas() });
            await sleep(300);

            const tx3 = new web3.eth.Contract(MulticallArtifact.abi as AbiItem[]).deploy({
                data: MulticallArtifact.bytecode,
            });
            const gas3 = await tx3.estimateGas();
            const multiCallContract = await tx3.send({ from: accounts[0], gas: gas3, gasPrice: '875000000' });
            store.dispatch(
                NetworkCRUD.actions.create({ networkId, web3, multicallAddress: multiCallContract.options.address }),
            );
            await sleep(300);

            const expectedBlockNumber = await web3.eth.getBlockNumber();

            const ethCall1 = {
                address,
                method: 'getValue',
            };
            const ethCall2 = {
                address,
                method: 'blockNumber',
            };
            store.dispatch(callBatchedAction({ networkId, requests: [ethCall1, ethCall2] }));
            await sleep(300);

            //Selector
            const getValue = await getContractCall(store.getState(), networkId, address, 'getValue');
            const blockNumber = await getContractCall(store.getState(), networkId, address, 'blockNumber');

            assert.equal(getValue, 42, 'getValue');
            assert.equal(blockNumber, expectedBlockNumber, 'blockNumber');

            //assert.equal(rpcBatch - rpcBatchInitial, 1, 'rpc_batch rpc calls != expected');
            //Batching with multicall logs only 1 eth_call operations
            //assert.equal(ethCall - ethCallInitial, 1, 'eth_call rpc calls != expected');
        });
    });
});

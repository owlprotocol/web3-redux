import { assert } from 'chai';
import Web3 from 'web3';
import { Contract as Web3Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import ganache from 'ganache-core';
import { name } from '../common';

import BlockNumber from '../../abis/BlockNumber.json';
import { sleep, ganacheLogger } from '../../utils';
import { networkId } from '../../test/data';

import { createStore, StoreType } from '../../store';
import { create as createNetwork } from '../../network';

import { ContractId } from '../model';
import { selectContractCall } from '../selectors';
import { create as createAction, call as callAction } from '../actions';

describe(`${name}.sagas.call`, () => {
    let web3: Web3; //Web3 loaded from store
    let web3Sender: Web3;
    let accounts: string[];
    let store: StoreType;
    let web3Contract: Web3Contract;

    let address: string;
    let id: ContractId;

    let rpcLogger: ReturnType<typeof ganacheLogger>;
    let ethCall = 0;
    let rpcBatch = 0;

    before(async () => {
        rpcLogger = ganacheLogger();

        const provider = ganache.provider({
            networkId: parseInt(networkId),
            logger: rpcLogger,
            verbose: true,
        });
        //@ts-ignore
        web3 = new Web3(provider);
        //@ts-ignore
        web3Sender = new Web3(provider);
        accounts = await web3.eth.getAccounts();

        const ethCallIncr = () => (ethCall += 1);
        const rpcBatchIncr = () => (rpcBatch += 1);
        rpcLogger.addListener('eth_call', ethCallIncr);
        rpcLogger.addListener('rpc_batch', rpcBatchIncr);
    });

    beforeEach(async () => {
        ({ store } = createStore());
        store.dispatch(createNetwork({ networkId, web3, web3Sender }));

        const tx = new web3.eth.Contract(BlockNumber.abi as AbiItem[]).deploy({
            data: BlockNumber.bytecode,
        });
        const gas = await tx.estimateGas();
        web3Contract = await tx.send({ from: accounts[0], gas, gasPrice: '10000' });
        address = web3Contract.options.address;
        id = { networkId, address };

        store.dispatch(
            createAction({
                networkId,
                address,
                abi: BlockNumber.abi as AbiItem[],
            }),
        );
    });

    describe('call', () => {
        it('()', async () => {
            const ethCallInitial = ethCall;
            const rpcBatchInitial = rpcBatch;

            const tx2 = await web3Contract.methods.setValue(42);
            const gas2 = await tx2.estimateGas();
            await tx2.send({ from: accounts[0], gas: gas2, gasPrice: '10000' });

            store.dispatch(
                createAction({
                    networkId,
                    address,
                    abi: BlockNumber.abi as AbiItem[],
                }),
            );
            store.dispatch(
                callAction({
                    networkId,
                    address,
                    method: 'getValue',
                }),
            );
            await sleep(300);

            //Selector
            const value = selectContractCall(store.getState(), id, 'getValue');

            assert.equal(value, 42, 'getValue');
            assert.strictEqual(value, '42', 'getValue');
            assert.equal(rpcBatch - rpcBatchInitial, 0, 'rpc_batch rpc calls != expected');
            assert.equal(ethCall - ethCallInitial, 1, 'eth_call rpc calls != expected');
        });
    });
});

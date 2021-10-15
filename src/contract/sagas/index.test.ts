import { assert } from 'chai';
import Web3 from 'web3';
import { Contract as Web3Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import ganache from 'ganache-core';

import BlockNumber from '../../abis/BlockNumber.json';
import Multicall from '../../abis/Multicall.json';

import { createStore } from '../../store';
import { Block, Contract, Network, Transaction } from '../../index';
import { TransactionReceipt } from 'web3-core';
import { CALL_BLOCK_SYNC, CALL_TRANSACTION_SYNC, contractId } from '../model';
import { mineBlock, sleep, ganacheLogger } from '../../test/utils';
import { validatedContractEvent } from '../../contractevent';

const networkId = '1337';

describe('contract.sagas', () => {
    let web3: Web3; //Web3 loaded from store
    let accounts: string[];
    let store: ReturnType<typeof createStore>;
    let web3Contract: Web3Contract;

    let address: string;
    let id: string;

    let rpcLogger: ReturnType<typeof ganacheLogger>;
    let ethCall = 0;
    let rpcBatch = 0;

    before(async () => {
        const networkIdInt = parseInt(networkId);
        rpcLogger = ganacheLogger();

        const provider = ganache.provider({
            networkId: networkIdInt,
            logger: rpcLogger,
            verbose: true,
        });
        //@ts-ignore
        web3 = new Web3(provider);
        accounts = await web3.eth.getAccounts();

        const ethCallIncr = () => (ethCall += 1);
        const rpcBatchIncr = () => (rpcBatch += 1);
        rpcLogger.addListener('eth_call', ethCallIncr);
        rpcLogger.addListener('rpc_batch', rpcBatchIncr);
    });

    beforeEach(async () => {
        store = createStore();
        store.dispatch(Network.create({ networkId, web3 }));

        const tx = new web3.eth.Contract(BlockNumber.abi as AbiItem[]).deploy({
            data: BlockNumber.bytecode,
        });
        const gas = await tx.estimateGas();
        web3Contract = await tx.send({ from: accounts[0], gas, gasPrice: '10000' });
        address = web3Contract.options.address;
        id = contractId({ networkId, address });

        store.dispatch(
            Contract.create({
                networkId,
                address,
                abi: BlockNumber.abi as AbiItem[],
            }),
        );
    });

    describe('call', () => {
        it('store.dispatch(ContractSagas.call())', async () => {
            const ethCallInitial = ethCall;
            const rpcBatchInitial = rpcBatch;

            const tx2 = await web3Contract.methods.setValue(42);
            const gas2 = await tx2.estimateGas();
            await tx2.send({ from: accounts[0], gas: gas2, gasPrice: '10000' });

            store.dispatch(
                Contract.create({
                    networkId,
                    address,
                    abi: BlockNumber.abi as AbiItem[],
                }),
            );
            store.dispatch(
                Contract.call({
                    networkId,
                    address,
                    method: 'getValue',
                }),
            );
            await sleep(150);

            //Selector
            const value = Contract.selectContractCallById(store.getState(), id, 'getValue');

            assert.equal(value, 42, 'getValue');
            assert.strictEqual(value, '42', 'getValue');
            assert.equal(rpcBatch - rpcBatchInitial, 0, 'rpc_batch rpc calls != expected');
            assert.equal(ethCall - ethCallInitial, 1, 'eth_call rpc calls != expected');
        });

        it('store.dispatch(Contract.callBatched())', async () => {
            const ethCallInitial = ethCall;
            const rpcBatchInitial = rpcBatch;

            const tx2 = await web3Contract.methods.setValue(42);
            await tx2.send({ from: accounts[0], gas: await tx2.estimateGas() });
            await sleep(150);

            const expectedBlockNumber = await web3.eth.getBlockNumber();

            const ethCall1 = {
                address,
                method: 'getValue',
            };
            const ethCall2 = {
                address,
                method: 'blockNumber',
            };

            store.dispatch(Contract.callBatched({ networkId, requests: [ethCall1, ethCall2] }));
            await sleep(150);

            //Selector
            const getValue = Contract.selectContractCallById(store.getState(), id, 'getValue');

            const blockNumber = Contract.selectContractCallById(store.getState(), id, 'blockNumber');

            assert.equal(getValue, 42, 'getValue');
            assert.equal(blockNumber, expectedBlockNumber, 'blockNumber');

            assert.equal(rpcBatch - rpcBatchInitial, 1, 'rpc_batch rpc calls != expected');
            //While a batched rpc request, still logs 2 separate eth_call operations
            assert.equal(ethCall - ethCallInitial, 2, 'eth_call rpc calls != expected');
        });

        it('store.dispatch(Contract.callBatched(multicall:true))', async () => {
            const ethCallInitial = ethCall;
            const rpcBatchInitial = rpcBatch;

            const tx2 = await web3Contract.methods.setValue(42);
            await tx2.send({ from: accounts[0], gas: await tx2.estimateGas() });
            await sleep(150);

            const tx3 = new web3.eth.Contract(Multicall.abi as AbiItem[]).deploy({
                data: Multicall.bytecode,
            });
            const gas3 = await tx3.estimateGas();
            const multiCallContract = await tx3.send({ from: accounts[0], gas: gas3, gasPrice: '10000' });
            store.dispatch(Network.create({ networkId, web3, multicallAddress: multiCallContract.options.address }));
            await sleep(150);

            const expectedBlockNumber = await web3.eth.getBlockNumber();

            const ethCall1 = {
                address,
                method: 'getValue',
            };
            const ethCall2 = {
                address,
                method: 'blockNumber',
            };
            store.dispatch(Contract.callBatched({ networkId, requests: [ethCall1, ethCall2] }));
            await sleep(300);

            //Selector
            const getValue = Contract.selectContractCallById(store.getState(), id, 'getValue');

            const blockNumber = Contract.selectContractCallById(store.getState(), id, 'blockNumber');

            assert.equal(getValue, 42, 'getValue');
            assert.equal(blockNumber, expectedBlockNumber, 'blockNumber');

            assert.equal(rpcBatch - rpcBatchInitial, 1, 'rpc_batch rpc calls != expected');
            //Batching with multicall logs only 1 eth_call operations
            assert.equal(ethCall - ethCallInitial, 1, 'eth_call rpc calls != expected');
        });
    });

    describe('callSynced', () => {
        it('({sync:false})', async () => {
            const tx2 = await web3Contract.methods.setValue(42);
            const gas2 = await tx2.estimateGas();
            await tx2.send({ from: accounts[0], gas: gas2, gasPrice: '10000' });

            store.dispatch(
                Contract.callSynced({
                    networkId,
                    address,
                    method: 'getValue',
                    sync: false,
                }),
            );
            await sleep(150);

            //Selector
            const value = Contract.selectContractCallById(store.getState(), id, 'getValue');

            assert.equal(value, 42, 'getValue');
            assert.strictEqual(value, '42', 'getValue');
        });

        it('({sync:CALL_BLOCK_SYNC})', async () => {
            //Block subscription used for updates
            store.dispatch(Block.subscribe({ networkId, returnTransactionObjects: false }));
            store.dispatch(
                Contract.callSynced({
                    networkId,
                    address,
                    method: 'blockNumber',
                    sync: CALL_BLOCK_SYNC,
                }),
            );
            await sleep(150);

            const blockNumber1 = Contract.selectContractCallById(store.getState(), id, 'blockNumber');

            //Increment block
            await mineBlock(web3);

            const blockNumber2 = Contract.selectContractCallById(store.getState(), id, 'blockNumber');

            assert.equal(parseInt(blockNumber2), parseInt(blockNumber1) + 1);
        });

        it('({sync:CALL_TRANSACTION_SYNC}) - Transaction.fetch', async () => {
            const tx2 = await web3Contract.methods.setValue(42);
            const gas2 = await tx2.estimateGas();
            await tx2.send({ from: accounts[0], gas: gas2, gasPrice: '10000' });

            store.dispatch(
                Contract.callSynced({
                    networkId,
                    address,
                    method: 'getValue',
                    sync: CALL_TRANSACTION_SYNC,
                }),
            );
            await sleep(150);

            const value1 = Contract.selectContractCallById(store.getState(), id, 'getValue');
            assert.equal(value1, 42);

            //Send transaction to contract, triggering a refresh
            const tx3 = await web3Contract.methods.setValue(666);
            const gas3 = await tx3.estimateGas();
            const receipt: TransactionReceipt = await tx3.send({ from: accounts[0], gas: gas3, gasPrice: '10000' });
            //Fetch transaction, triggering a refresh
            store.dispatch(
                Transaction.fetch({
                    networkId,
                    hash: receipt.transactionHash,
                }),
            );

            //Updated from transaction sync
            await sleep(150);
            const value2 = Contract.selectContractCallById(store.getState(), id, 'getValue');
            assert.equal(value2, 666);
        });

        it('({sync:CALL_TRANSACTION_SYNC}) - Block.subscribe', async () => {
            //Block subscription used for updates, must fetch transactions
            store.dispatch(Block.subscribe({ networkId, returnTransactionObjects: true }));
            const tx2 = await web3Contract.methods.setValue(42);
            const gas2 = await tx2.estimateGas();
            await tx2.send({ from: accounts[0], gas: gas2, gasPrice: '10000' });

            store.dispatch(
                Contract.callSynced({
                    networkId,
                    address,
                    method: 'getValue',
                    sync: CALL_TRANSACTION_SYNC,
                }),
            );
            await sleep(150);

            const value1 = Contract.selectContractCallById(store.getState(), id, 'getValue');
            assert.equal(value1, 42);

            //Send transaction to contract, triggering a refresh
            const tx3 = await web3Contract.methods.setValue(666);
            const gas3 = await tx3.estimateGas();
            await tx3.send({ from: accounts[0], gas: gas3, gasPrice: '10000' });

            //Updated from transaction sync
            await sleep(150);
            const value2 = Contract.selectContractCallById(store.getState(), id, 'getValue');
            assert.equal(value2, 666);
        });
    });

    describe('send', () => {
        it('store.dispatch(ContractSagas.send())', async () => {
            store.dispatch(
                Contract.send({
                    networkId,
                    from: accounts[0],
                    address,
                    method: 'setValue',
                    args: [42],
                }),
            );

            await sleep(300);

            const value = await web3Contract.methods.getValue().call();
            assert.equal(value, 42, 'setValue() did not work!');
        });
    });

    describe('eventGetPast', () => {
        it('(networkId,address,eventName)', async (): Promise<void> => {
            const expectedEvents: any[] = [];
            web3Contract.events['NewValue']().on('data', (event: any) => {
                expectedEvents.push(validatedContractEvent({ networkId, address, name: 'NewValue', ...event }));
            });

            const tx2 = await web3Contract.methods.setValue(42);
            const gas2 = await tx2.estimateGas();
            await tx2.send({ from: accounts[0], gas: gas2, gasPrice: '10000' });

            await sleep(2000);

            store.dispatch(
                Contract.eventGetPast({
                    networkId,
                    address,
                    eventName: 'NewValue',
                }),
            );

            await sleep(150);

            const events1 = Contract.selectContractEventsByIdFiltered(store.getState(), id, 'NewValue');
            assert.deepEqual(events1, expectedEvents);
        });
    });

    describe('eventSubscribe', () => {
        it('(networkId,address,eventName)', async (): Promise<void> => {
            const expectedEvents: any[] = [];
            web3Contract.events['NewValue']().on('data', (event: any) => {
                expectedEvents.push(validatedContractEvent({ networkId, address, name: 'NewValue', ...event }));
            });
            store.dispatch(
                Contract.eventSubscribe({
                    networkId,
                    address,
                    eventName: 'NewValue',
                }),
            );

            const tx2 = await web3Contract.methods.setValue(42);
            const gas2 = await tx2.estimateGas();
            await tx2.send({ from: accounts[0], gas: gas2, gasPrice: '10000' });

            const events1 = Contract.selectContractEventsByIdFiltered(store.getState(), id, 'NewValue');
            assert.deepEqual(events1, expectedEvents);
        });

        it('(...,filter): [event]', async (): Promise<void> => {
            const expectedEvents: any[] = [];
            web3Contract.events['NewValue']({ filter: { value: 42 } }).on('data', (event: any) => {
                expectedEvents.push(validatedContractEvent({ networkId, address, name: 'NewValue', ...event }));
            });
            store.dispatch(
                Contract.eventSubscribe({
                    networkId,
                    address,
                    eventName: 'NewValue',
                    filter: { value: 42 },
                }),
            );

            const tx2 = await web3Contract.methods.setValue(42);
            const gas2 = await tx2.estimateGas();
            await tx2.send({ from: accounts[0], gas: gas2, gasPrice: '10000' });

            const events1 = Contract.selectContractEventsByIdFiltered(store.getState(), id, 'NewValue');
            assert.deepEqual(events1, expectedEvents);
        });

        it('(...,filter): []', async (): Promise<void> => {
            const expectedEvents: any[] = [];
            store.dispatch(
                Contract.eventSubscribe({
                    networkId,
                    address,
                    eventName: 'NewValue',
                    filter: { value: 43 },
                }),
            );

            const tx2 = await web3Contract.methods.setValue(42);
            const gas2 = await tx2.estimateGas();
            await tx2.send({ from: accounts[0], gas: gas2, gasPrice: '10000' });

            //Expect no event to be captured
            const events1 = Contract.selectContractEventsByIdFiltered(store.getState(), id, 'NewValue');
            assert.deepEqual(events1, expectedEvents);
        });

        it('(...,filter): multiple non-exclusive subscriptions', async (): Promise<void> => {
            const expectedEvents: any[] = [];
            web3Contract.events['NewValue']().on('data', (event: any) => {
                expectedEvents.push(validatedContractEvent({ networkId, address, name: 'NewValue', ...event }));
            });
            store.dispatch(
                Contract.eventSubscribe({
                    networkId,
                    address,
                    eventName: 'NewValue',
                    filter: { value: 42 },
                }),
            );
            //Second event listener
            store.dispatch(
                Contract.eventSubscribe({
                    networkId,
                    address,
                    eventName: 'NewValue',
                    filter: { value: 43 },
                }),
            );

            const tx2 = await web3Contract.methods.setValue(42);
            const gas2 = await tx2.estimateGas();
            await tx2.send({ from: accounts[0], gas: gas2, gasPrice: '10000' });

            const tx3 = await web3Contract.methods.setValue(43);
            const gas3 = await tx3.estimateGas();
            await tx3.send({ from: accounts[0], gas: gas3, gasPrice: '10000' });

            const events1 = Contract.selectContractEventsByIdFiltered(store.getState(), id, 'NewValue');
            assert.equal(events1?.length, expectedEvents.length, 'expectedEvents.length');
            assert.deepEqual(events1, expectedEvents, 'events value=any');
            const events2 = Contract.selectContractEventsByIdFiltered(store.getState(), id, 'NewValue', {
                value: '42',
            });
            assert.deepEqual(events2, [expectedEvents[0]], 'events value=42');
            const events3 = Contract.selectContractEventsByIdFiltered(store.getState(), id, 'NewValue', {
                value: '43',
            });
            assert.deepEqual(events3, [expectedEvents[1]], 'events value=43');
        });
    });
});

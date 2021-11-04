import { assert } from 'chai';
import Web3 from 'web3';
import { Contract as Web3Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import { TransactionReceipt } from 'web3-core';
import ganache from 'ganache-core';
import { name } from './common';

import BlockNumber from '../abis/BlockNumber.json';
import Multicall from '../abis/Multicall.json';
import { mineBlock, sleep, ganacheLogger } from '../test/utils';

import { createStore, StoreType } from '../store';
import { subscribe as blockSubscribe } from '../block';
import { create as createNetwork } from '../network';
import { validate as validatedContractEvent } from '../contractevent/model';
import { Sync } from '../sync/model';
import selectSync from '../sync/selector/selectByIdSingle';
import { fetch as fetchTransaction } from '../transaction/actions';

import { getId } from './model';
import { selectContractCall, selectContractEvents } from './selectors';
import {
    create as createAction,
    call as callAction,
    callBatched as callBatchedAction,
    callSynced as callSyncedAction,
    eventGetPast as eventGetPastAction,
    send as sendAction,
    eventSubscribe as eventSubscribeAction,
} from './actions';

const networkId = '1337';

describe(`${name}.integration`, () => {
    let web3: Web3; //Web3 loaded from store
    let web3Sender: Web3;
    let accounts: string[];
    let store: StoreType;
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
        //@ts-ignore
        web3Sender = new Web3(provider);
        accounts = await web3.eth.getAccounts();

        const ethCallIncr = () => (ethCall += 1);
        const rpcBatchIncr = () => (rpcBatch += 1);
        rpcLogger.addListener('eth_call', ethCallIncr);
        rpcLogger.addListener('rpc_batch', rpcBatchIncr);
    });

    beforeEach(async () => {
        store = createStore();
        store.dispatch(createNetwork({ networkId, web3, web3Sender }));

        const tx = new web3.eth.Contract(BlockNumber.abi as AbiItem[]).deploy({
            data: BlockNumber.bytecode,
        });
        const gas = await tx.estimateGas();
        web3Contract = await tx.send({ from: accounts[0], gas, gasPrice: '10000' });
        address = web3Contract.options.address;
        id = getId({ networkId, address });

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

        it('callBatched()', async () => {
            const ethCallInitial = ethCall;
            const rpcBatchInitial = rpcBatch;

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
            const getValue = selectContractCall(store.getState(), id, 'getValue');

            const blockNumber = selectContractCall(store.getState(), id, 'blockNumber');

            assert.equal(getValue, 42, 'getValue');
            assert.equal(blockNumber, expectedBlockNumber, 'blockNumber');

            assert.equal(rpcBatch - rpcBatchInitial, 1, 'rpc_batch rpc calls != expected');
            //While a batched rpc request, still logs 2 separate eth_call operations
            assert.equal(ethCall - ethCallInitial, 2, 'eth_call rpc calls != expected');
        });

        it.skip('callBatched(multicall:true)', async () => {
            const ethCallInitial = ethCall;
            const rpcBatchInitial = rpcBatch;

            const tx2 = await web3Contract.methods.setValue(42);
            await tx2.send({ from: accounts[0], gas: await tx2.estimateGas() });
            await sleep(300);

            const tx3 = new web3.eth.Contract(Multicall.abi as AbiItem[]).deploy({
                data: Multicall.bytecode,
            });
            const gas3 = await tx3.estimateGas();
            const multiCallContract = await tx3.send({ from: accounts[0], gas: gas3, gasPrice: '10000' });
            store.dispatch(createNetwork({ networkId, web3, multicallAddress: multiCallContract.options.address }));
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
            const getValue = selectContractCall(store.getState(), id, 'getValue');

            const blockNumber = selectContractCall(store.getState(), id, 'blockNumber');

            assert.equal(getValue, 42, 'getValue');
            assert.equal(blockNumber, expectedBlockNumber, 'blockNumber');

            assert.equal(rpcBatch - rpcBatchInitial, 1, 'rpc_batch rpc calls != expected');
            //Batching with multicall logs only 1 eth_call operations
            assert.equal(ethCall - ethCallInitial, 1, 'eth_call rpc calls != expected');
        });
    });

    describe('callSynced', () => {
        it('({sync:Block})', async () => {
            //Block subscription used for updates
            store.dispatch(blockSubscribe({ networkId, returnTransactionObjects: false }));
            const action = callSyncedAction({
                networkId,
                address,
                method: 'blockNumber',
                sync: 'Block',
            });
            store.dispatch(action);
            await sleep(300);
            const actionSync = action.payload.sync as Sync;
            const selectedSync = selectSync(store.getState(), actionSync.id!);
            assert.deepEqual(selectedSync, actionSync, 'Sync not created!');

            const blockNumber1 = selectContractCall(store.getState(), id, 'blockNumber');

            //Increment block
            await mineBlock(web3);
            await sleep(300);

            const blockNumber2 = selectContractCall(store.getState(), id, 'blockNumber');

            assert.equal(parseInt(blockNumber2), parseInt(blockNumber1) + 1);
        });

        it('({sync:Transaction}) - Transaction.fetch', async () => {
            const tx2 = await web3Contract.methods.setValue(42);
            const gas2 = await tx2.estimateGas();
            await tx2.send({ from: accounts[0], gas: gas2, gasPrice: '10000' });

            const action = callSyncedAction({
                networkId,
                address,
                method: 'getValue',
                sync: 'Transaction',
            });
            store.dispatch(action);
            await sleep(300);
            const actionSync = action.payload.sync as Sync;
            const selectedSync = selectSync(store.getState(), actionSync.id!);
            assert.deepEqual(selectedSync, actionSync, 'Sync not created!');

            const value1 = selectContractCall(store.getState(), id, 'getValue');
            assert.equal(value1, 42);

            //Send transaction to contract, triggering a refresh
            const tx3 = await web3Contract.methods.setValue(666);
            const gas3 = await tx3.estimateGas();
            const receipt: TransactionReceipt = await tx3.send({ from: accounts[0], gas: gas3, gasPrice: '10000' });
            //Fetch transaction, triggering a refresh
            store.dispatch(
                fetchTransaction({
                    networkId,
                    hash: receipt.transactionHash,
                }),
            );

            //Updated from transaction sync
            await sleep(300);
            const value2 = selectContractCall(store.getState(), id, 'getValue');
            assert.equal(value2, 666);
        });

        it('({sync:Transaction}) - Block.subscribe', async () => {
            //Block subscription used for updates, must fetch transactions
            store.dispatch(blockSubscribe({ networkId, returnTransactionObjects: true }));
            const tx2 = await web3Contract.methods.setValue(42);
            const gas2 = await tx2.estimateGas();
            await tx2.send({ from: accounts[0], gas: gas2, gasPrice: '10000' });

            const action = callSyncedAction({
                networkId,
                address,
                method: 'getValue',
                sync: 'Transaction',
            });
            store.dispatch(action);
            await sleep(300);
            const actionSync = action.payload.sync as Sync;
            const selectedSync = selectSync(store.getState(), actionSync.id!);
            assert.deepEqual(selectedSync, actionSync, 'Sync not created!');

            const value1 = selectContractCall(store.getState(), id, 'getValue');
            assert.equal(value1, 42);

            //Send transaction to contract, triggering a refresh
            const tx3 = await web3Contract.methods.setValue(666);
            const gas3 = await tx3.estimateGas();
            await tx3.send({ from: accounts[0], gas: gas3, gasPrice: '10000' });

            //Updated from transaction sync
            await sleep(300);
            const value2 = selectContractCall(store.getState(), id, 'getValue');
            assert.equal(value2, 666);
        });
    });

    describe('send', () => {
        it('store.dispatch(ContractSagas.send())', async () => {
            store.dispatch(
                sendAction({
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
                eventGetPastAction({
                    networkId,
                    address,
                    eventName: 'NewValue',
                }),
            );

            await sleep(300);

            const events1 = selectContractEvents(store.getState(), id, 'NewValue');
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
                eventSubscribeAction({
                    networkId,
                    address,
                    eventName: 'NewValue',
                }),
            );

            const tx2 = await web3Contract.methods.setValue(42);
            const gas2 = await tx2.estimateGas();
            await tx2.send({ from: accounts[0], gas: gas2, gasPrice: '10000' });

            const events1 = selectContractEvents(store.getState(), id, 'NewValue');
            assert.deepEqual(events1, expectedEvents);
        });

        it('(...,filter): [event]', async (): Promise<void> => {
            const expectedEvents: any[] = [];
            web3Contract.events['NewValue']({ filter: { value: 42 } }).on('data', (event: any) => {
                expectedEvents.push(validatedContractEvent({ networkId, address, name: 'NewValue', ...event }));
            });
            store.dispatch(
                eventSubscribeAction({
                    networkId,
                    address,
                    eventName: 'NewValue',
                    filter: { value: 42 },
                }),
            );

            const tx2 = await web3Contract.methods.setValue(42);
            const gas2 = await tx2.estimateGas();
            await tx2.send({ from: accounts[0], gas: gas2, gasPrice: '10000' });

            const events1 = selectContractEvents(store.getState(), id, 'NewValue');
            assert.deepEqual(events1, expectedEvents);
        });

        it('(...,filter): []', async (): Promise<void> => {
            const expectedEvents: any[] = [];
            store.dispatch(
                eventSubscribeAction({
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
            const events1 = selectContractEvents(store.getState(), id, 'NewValue');
            assert.deepEqual(events1, expectedEvents);
        });

        it('(...,filter): multiple non-exclusive subscriptions', async (): Promise<void> => {
            const expectedEvents: any[] = [];
            web3Contract.events['NewValue']().on('data', (event: any) => {
                expectedEvents.push(validatedContractEvent({ networkId, address, name: 'NewValue', ...event }));
            });
            store.dispatch(
                eventSubscribeAction({
                    networkId,
                    address,
                    eventName: 'NewValue',
                    filter: { value: 42 },
                }),
            );
            //Second event listener
            store.dispatch(
                eventSubscribeAction({
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

            const events1 = selectContractEvents(store.getState(), id, 'NewValue');
            assert.equal(events1?.length, expectedEvents.length, 'expectedEvents.length');
            assert.deepEqual(events1, expectedEvents, 'events value=any');
            const events2 = selectContractEvents(store.getState(), id, 'NewValue', {
                value: '42',
            });
            assert.deepEqual(events2, [expectedEvents[0]], 'events value=42');
            const events3 = selectContractEvents(store.getState(), id, 'NewValue', {
                value: '43',
            });
            assert.deepEqual(events3, [expectedEvents[1]], 'events value=43');
        });
    });
});
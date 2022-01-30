import { assert } from 'chai';
import Web3 from 'web3';
import { Contract as Web3Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import { TransactionReceipt } from 'web3-core';
import ganache from 'ganache-core';
import { name } from '../common';
import { networkId } from '../../test/data';

import BlockNumber from '../../abis/BlockNumber.json';
import { mineBlock, sleep } from '../../utils';

import { createStore, StoreType } from '../../store';
import { subscribe as blockSubscribe } from '../../block';
import { create as createNetwork } from '../../network';
import { Sync } from '../../sync/model';
import selectSync from '../../sync/selector/selectByIdSingle';
import { fetch as fetchTransaction } from '../../transaction/actions';

import { ContractId } from '../model';
import { selectContractCall } from '../selectors';
import { create as createAction, callSynced as callSyncedAction } from '../actions';

describe(`${name}.sagas.callSynced`, () => {
    let web3: Web3; //Web3 loaded from store
    let web3Sender: Web3;
    let accounts: string[];
    let store: StoreType;
    let web3Contract: Web3Contract;

    let address: string;
    let id: ContractId;

    before(async () => {
        const provider = ganache.provider({
            networkId: parseInt(networkId),
        });
        //@ts-ignore
        web3 = new Web3(provider);
        //@ts-ignore
        web3Sender = new Web3(provider);
        accounts = await web3.eth.getAccounts();
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
});

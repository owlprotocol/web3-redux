import { assert } from 'chai';
import Web3 from 'web3';
import Ganache from 'ganache-core';
import { Block, Transaction } from '../../index';
import { networkId } from '../../test/data';
import { createStore, StoreType } from '../../store';
import { create as createNetwork } from '../../network/actions';
import { Contract } from '../model/interface';
import { name } from '../common';
import { selectByIdSingle } from '../selectors';
import { create as createAction, fetchBalanceSynced as fetchBalanceSyncedAction } from '../actions';
import { ZERO_ADDRESS, sleep } from '../../utils';

describe(`${name}.integration`, () => {
    let store: StoreType;
    let web3: Web3;

    let item: Contract;

    const to = ZERO_ADDRESS;

    before(async () => {
        const provider = Ganache.provider({
            networkId: parseInt(networkId),
        });
        //@ts-ignore
        web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        item = { networkId, address: accounts[0] };
    });

    beforeEach(() => {
        ({ store } = createStore());
        store.dispatch(createNetwork({ networkId, web3 }));
        store.dispatch(createAction(item));
    });

    describe('fetchBalanceSynced', () => {
        it('({sync:false})', async () => {
            store.dispatch(fetchBalanceSyncedAction({ ...item, sync: 'once' }));
            const expected1 = await web3.eth.getBalance(item.address!);
            const account1 = selectByIdSingle(store.getState(), item);
            assert.equal(account1!.balance, expected1, 'initial balance');

            await web3.eth.sendTransaction({ from: item.address, to, value: '1' });
            const expected2 = await web3.eth.getBalance(item.address!);
            assert.notEqual(expected1, expected2, 'balance not changed');

            const account2 = selectByIdSingle(store.getState(), item);
            //No sync, balance stays unchanged
            assert.equal(account2!.balance, expected1, 'previous balance');
            assert.notEqual(account2!.balance, expected2, 'updated balance');
        });

        it('({sync:Block})', async () => {
            //Block subscription used for updates
            store.dispatch(Block.subscribe({ networkId, returnTransactionObjects: false }));
            store.dispatch(fetchBalanceSyncedAction({ ...item, sync: 'Block' }));
            const expected1 = await web3.eth.getBalance(item.address!);
            const account1 = selectByIdSingle(store.getState(), item);
            assert.equal(account1!.balance, expected1, 'initial balance');

            await web3.eth.sendTransaction({ from: item.address, to, value: '1' });
            const expected2 = await web3.eth.getBalance(item.address!);
            assert.notEqual(expected1, expected2, 'balance not changed');

            const account2 = selectByIdSingle(store.getState(), item);
            //sync, balance updated
            assert.notEqual(account2!.balance, expected1, 'previous balance');
            assert.equal(account2!.balance, expected2, 'updated balance');
        });

        it('({sync:Transaction}) - Transaction.fetch', async () => {
            store.dispatch(fetchBalanceSyncedAction({ ...item, sync: 'Transaction' }));
            const expected1 = await web3.eth.getBalance(item.address!);
            const account1 = selectByIdSingle(store.getState(), item);
            assert.equal(account1!.balance, expected1, 'initial balance');

            const receipt = await web3.eth.sendTransaction({ from: item.address, to, value: '1' });
            //Fetch transaction, triggering a refresh
            store.dispatch(
                Transaction.fetch({
                    networkId,
                    hash: receipt.transactionHash,
                }),
            );
            await sleep(150);

            const expected2 = await web3.eth.getBalance(item.address!);
            assert.notEqual(expected1, expected2, 'balance not changed');

            const account2 = selectByIdSingle(store.getState(), item);
            //sync, balance updated
            assert.notEqual(account2!.balance, expected1, 'previous balance');
            assert.equal(account2!.balance, expected2, 'updated balance');
        });

        it('({sync:Transaction}) - Block.subscribe', async () => {
            //Block subscription used for updates, must fetch transactions
            store.dispatch(Block.subscribe({ networkId, returnTransactionObjects: true }));
            store.dispatch(fetchBalanceSyncedAction({ ...item, sync: 'Transaction' }));
            const expected1 = await web3.eth.getBalance(item.address!);
            const account1 = selectByIdSingle(store.getState(), item);
            assert.equal(account1!.balance, expected1, 'initial balance');

            await web3.eth.sendTransaction({ from: item.address, to, value: '1' });
            const expected2 = await web3.eth.getBalance(item.address!);
            assert.notEqual(expected1, expected2, 'balance not changed');

            const account2 = selectByIdSingle(store.getState(), item);
            //sync, balance updated
            assert.notEqual(account2!.balance, expected1, 'previous balance');
            assert.equal(account2!.balance, expected2, 'updated balance');
        });
    });
});

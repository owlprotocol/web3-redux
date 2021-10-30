import { assert } from 'chai';
import Web3 from 'web3';
import Ganache from 'ganache-core';

import { Block, Transaction } from '../index';
import { createStore, StoreType } from '../store';

import { sleep } from '../test/utils';
import { create as createNetwork } from '../network/actions';

import { name } from './common';
import { selectByIdSingle } from './selectors';

import { getId, Id, InterfacePartial } from './model/interface';

import createAction from './actions/create';
import fetchBalanceAction from './actions/fetchBalance';
import fetchBalanceSyncedAction from './actions/fetchBalanceSynced';
import fetchNonceAction from './actions/fetchNonce';
import { ZERO_ADDRESS } from '../utils';

describe(`${name}.integration`, () => {
    let store: StoreType;
    let web3: Web3;

    const networkId = '1337';

    let item: InterfacePartial;
    let id: Id;

    const to = ZERO_ADDRESS;

    before(async () => {
        const provider = Ganache.provider({
            networkId: parseInt(networkId),
        });
        //@ts-ignore
        web3 = new Web3(provider);

        const accounts = await web3.eth.getAccounts();
        item = { networkId, address: accounts[0] };
        id = getId(item);
    });

    beforeEach(() => {
        store = createStore();
        store.dispatch(createNetwork({ networkId, web3 }));
        store.dispatch(createAction(item));
    });

    it('fetchBalance()', async () => {
        store.dispatch(fetchBalanceAction(id));
        const expected = await web3.eth.getBalance(item.address!);
        const account = selectByIdSingle(store.getState(), id);
        assert.equal(account!.balance, expected, 'initial balance');
    });

    it('fetchNonce()', async () => {
        store.dispatch(fetchNonceAction(id));
        const expected = await web3.eth.getTransactionCount(item.address!);
        const account = selectByIdSingle(store.getState(), id);
        assert.equal(account!.nonce, expected, 'initial nonce');
    });

    describe('fetchBalanceSynced', () => {
        it('({sync:false})', async () => {
            store.dispatch(fetchBalanceSyncedAction({ id, sync: false }));
            const expected1 = await web3.eth.getBalance(item.address!);
            const account1 = selectByIdSingle(store.getState(), id);
            assert.equal(account1!.balance, expected1, 'initial balance');

            await web3.eth.sendTransaction({ from: item.address, to, value: '1' });
            const expected2 = await web3.eth.getBalance(item.address!);
            assert.notEqual(expected1, expected2, 'balance not changed');

            const account2 = selectByIdSingle(store.getState(), id);
            //No sync, balance stays unchanged
            assert.equal(account2!.balance, expected1, 'previous balance');
            assert.notEqual(account2!.balance, expected2, 'updated balance');
        });

        it('({sync:Block})', async () => {
            //Block subscription used for updates
            store.dispatch(Block.subscribe({ networkId, returnTransactionObjects: false }));
            store.dispatch(fetchBalanceSyncedAction({ id, sync: 'Block' }));
            const expected1 = await web3.eth.getBalance(item.address!);
            const account1 = selectByIdSingle(store.getState(), id);
            assert.equal(account1!.balance, expected1, 'initial balance');

            await web3.eth.sendTransaction({ from: item.address, to, value: '1' });
            const expected2 = await web3.eth.getBalance(item.address!);
            assert.notEqual(expected1, expected2, 'balance not changed');

            const account2 = selectByIdSingle(store.getState(), id);
            //sync, balance updated
            assert.notEqual(account2!.balance, expected1, 'previous balance');
            assert.equal(account2!.balance, expected2, 'updated balance');
        });

        it('({sync:Transaction}) - Transaction.fetch', async () => {
            store.dispatch(fetchBalanceSyncedAction({ id, sync: 'Transaction' }));
            const expected1 = await web3.eth.getBalance(item.address!);
            const account1 = selectByIdSingle(store.getState(), id);
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

            const account2 = selectByIdSingle(store.getState(), id);
            //sync, balance updated
            assert.notEqual(account2!.balance, expected1, 'previous balance');
            assert.equal(account2!.balance, expected2, 'updated balance');
        });

        it('({sync:Transaction}) - Block.subscribe', async () => {
            //Block subscription used for updates, must fetch transactions
            store.dispatch(Block.subscribe({ networkId, returnTransactionObjects: true }));
            store.dispatch(fetchBalanceSyncedAction({ id, sync: 'Transaction' }));
            const expected1 = await web3.eth.getBalance(item.address!);
            const account1 = selectByIdSingle(store.getState(), id);
            assert.equal(account1!.balance, expected1, 'initial balance');

            await web3.eth.sendTransaction({ from: item.address, to, value: '1' });
            const expected2 = await web3.eth.getBalance(item.address!);
            assert.notEqual(expected1, expected2, 'balance not changed');

            const account2 = selectByIdSingle(store.getState(), id);
            //sync, balance updated
            assert.notEqual(account2!.balance, expected1, 'previous balance');
            assert.equal(account2!.balance, expected2, 'updated balance');
        });
    });
});

import { assert } from 'chai';
import Web3 from 'web3';
import ganache from 'ganache-core';

import { create as createNetwork } from '../../network/actions';
import { createStore, StoreType } from '../../store';
import { selectByAddressSingle } from '../selector';
import { fetchBalance, fetchNonce, fetchBalanceSynced, create } from '../actions';
import { Block, Transaction } from '../../index';
import { sleep } from '../../test/utils';

const networkId = '1337';

describe('account.sagas', () => {
    let web3: Web3; //Web3 loaded from store
    let address: string;
    let to: string;
    let store: StoreType;

    before(async () => {
        const networkIdInt = parseInt(networkId);
        const provider = ganache.provider({
            networkId: networkIdInt,
        });
        //@ts-ignore
        web3 = new Web3(provider);
        //Disable ENS to avoid extra account calls
        //@ts-ignore
        web3.eth.ens._lastSyncCheck = Number.MAX_SAFE_INTEGER;
        //@ts-ignore
        web3.eth.ens.registryAddress = '0x0000000000000000000000000000000000000000';

        const accounts = await web3.eth.getAccounts();
        address = accounts[0]!;
        to = accounts[1]!;
    });

    beforeEach(async () => {
        store = createStore();
        store.dispatch(createNetwork({ networkId, web3 }));
        store.dispatch(create({ networkId, address }));
    });

    it('fetchBalance()', async () => {
        store.dispatch(fetchBalance({ networkId, address }));

        const expected = await web3.eth.getBalance(address);
        const account = selectByAddressSingle(store.getState(), networkId, address);
        assert.equal(account!.balance, expected, 'initial balance');
    });

    it('fetchNonce()', async () => {
        store.dispatch(fetchNonce({ networkId, address }));

        const expected = await web3.eth.getTransactionCount(address);
        const account = selectByAddressSingle(store.getState(), networkId, address);
        assert.equal(account!.nonce, expected, 'initial nonce');
    });

    describe('fethBalanceSynced', () => {
        it('({sync:false})', async () => {
            store.dispatch(fetchBalanceSynced({ networkId, address, sync: false }));
            const expected1 = await web3.eth.getBalance(address);
            const account1 = selectByAddressSingle(store.getState(), networkId, address);
            assert.equal(account1!.balance, expected1, 'initial balance');

            await web3.eth.sendTransaction({ from: address, to, value: '1' });
            const expected2 = await web3.eth.getBalance(address);
            assert.notEqual(expected1, expected2, 'balance not changed');

            const account2 = selectByAddressSingle(store.getState(), networkId, address);
            //No sync, balance stays unchanged
            assert.equal(account2!.balance, expected1, 'previous balance');
            assert.notEqual(account2!.balance, expected2, 'updated balance');
        });

        it('({sync:Block})', async () => {
            //Block subscription used for updates
            store.dispatch(Block.subscribe({ networkId, returnTransactionObjects: false }));
            store.dispatch(fetchBalanceSynced({ networkId, address, sync: 'Block' }));
            const expected1 = await web3.eth.getBalance(address);
            const account1 = selectByAddressSingle(store.getState(), networkId, address);
            assert.equal(account1!.balance, expected1, 'initial balance');

            await web3.eth.sendTransaction({ from: address, to, value: '1' });
            const expected2 = await web3.eth.getBalance(address);
            assert.notEqual(expected1, expected2, 'balance not changed');

            const account2 = selectByAddressSingle(store.getState(), networkId, address);
            //sync, balance updated
            assert.notEqual(account2!.balance, expected1, 'previous balance');
            assert.equal(account2!.balance, expected2, 'updated balance');
        });

        it('({sync:Transaction}) - Transaction.fetch', async () => {
            store.dispatch(fetchBalanceSynced({ networkId, address, sync: 'Transaction' }));
            const expected1 = await web3.eth.getBalance(address);
            const account1 = selectByAddressSingle(store.getState(), networkId, address);
            assert.equal(account1!.balance, expected1, 'initial balance');

            const receipt = await web3.eth.sendTransaction({ from: address, to, value: '1' });
            //Fetch transaction, triggering a refresh
            store.dispatch(
                Transaction.fetch({
                    networkId,
                    hash: receipt.transactionHash,
                }),
            );
            await sleep(150);

            const expected2 = await web3.eth.getBalance(address);
            assert.notEqual(expected1, expected2, 'balance not changed');

            const account2 = selectByAddressSingle(store.getState(), networkId, address);
            //sync, balance updated
            assert.notEqual(account2!.balance, expected1, 'previous balance');
            assert.equal(account2!.balance, expected2, 'updated balance');
        });

        it('({sync:Transaction}) - Block.subscribe', async () => {
            //Block subscription used for updates, must fetch transactions
            store.dispatch(Block.subscribe({ networkId, returnTransactionObjects: true }));
            store.dispatch(fetchBalanceSynced({ networkId, address, sync: 'Transaction' }));
            const expected1 = await web3.eth.getBalance(address);
            const account1 = selectByAddressSingle(store.getState(), networkId, address);
            assert.equal(account1!.balance, expected1, 'initial balance');

            await web3.eth.sendTransaction({ from: address, to, value: '1' });
            const expected2 = await web3.eth.getBalance(address);
            assert.notEqual(expected1, expected2, 'balance not changed');

            const account2 = selectByAddressSingle(store.getState(), networkId, address);
            //sync, balance updated
            assert.notEqual(account2!.balance, expected1, 'previous balance');
            assert.equal(account2!.balance, expected2, 'updated balance');
        });
    });
});

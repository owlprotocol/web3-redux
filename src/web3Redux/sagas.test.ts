import { assert } from 'chai';
import ganache from 'ganache-core';
import { createStore, StoreType } from '../store';
import { Network, Web3Redux, Block, Transaction } from '../index';
import { sleepForPort } from '../test/utils';
import Web3 from 'web3';

describe('web3Redux.sagas', () => {
    let server1: ganache.Server;
    let server2: ganache.Server;
    let store: StoreType;
    let accounts1: string[];
    let accounts2: string[];
    let web3Network1: Web3;
    let web3Network2: Web3;

    before(async () => {
        server1 = ganache.server({
            port: 0,
            networkId: 1,
            blockTime: 1,
        });
        const port1 = await sleepForPort(server1, 1000);
        const rpc1 = `ws://localhost:${port1}`;

        server2 = ganache.server({
            port: 0,
            networkId: 1337,
            blockTime: 1,
        });
        const port2 = await sleepForPort(server2, 1000);
        const rpc2 = `ws://localhost:${port2}`;

        web3Network1 = new Web3(rpc1);
        web3Network2 = new Web3(rpc2);
        accounts1 = await web3Network1.eth.getAccounts();
        accounts2 = await web3Network2.eth.getAccounts();

        //Warning: For testing purposes only
        process.env['LOCAL_RPC'] = rpc1;
        process.env['MAINNET_RPC'] = rpc2;
    });

    after(() => {
        //server1.close();
        //server2.close();
    });

    beforeEach(() => {
        store = createStore();
    });

    it('Web3Redux.initialize', async () => {
        store.dispatch(Web3Redux.initialize());

        //State
        assert.equal(
            Object.values(store.getState().web3Redux['Network'].itemsById).length,
            2,
            'state.web3Redux.Network.itemsById.length',
        );

        //Network.select
        assert.equal(Network.selectByIdMany(store.getState()).length, 2, 'Network.select().length');

        await web3Network1.eth.sendTransaction({ from: accounts1[0], to: accounts1[1], value: '1' });
        await web3Network2.eth.sendTransaction({ from: accounts2[0], to: accounts2[1], value: '1' });

        //Block.select
        assert.isAtLeast(Block.selectByIdMany(store.getState()).length, 2, 'synced block headers');

        //Transaction.select
        assert.equal(Transaction.selectByIdMany(store.getState()).length, 2, 'synced block transactions');
    });
});

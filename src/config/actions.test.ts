import { assert } from 'chai';
import Web3 from 'web3';
import { createStore, StoreType } from '../store';
import { Config, Network } from '../index';

describe('config.actions', () => {
    let store: StoreType;

    beforeEach(() => {
        store = createStore();
    });

    describe('empty', () => {
        it('select => undefined', async () => {
            const selected = Config.select(store.getState());
            assert.equal(selected, undefined);
        });

        it('selectNetworkId => undefined', async () => {
            const selected = Config.selectNetworkId(store.getState());
            assert.equal(selected, undefined);
        });

        it('selectNetwork => undefined', async () => {
            const selected = Config.selectNetwork(store.getState());
            assert.equal(selected, undefined);
        });
    });

    describe('singleton', () => {
        const networkId = '42';
        const account = '0x0000000000000000000000000000000000000000';

        beforeEach(() => {
            store.dispatch(Config.setNetworkId(networkId));
            store.dispatch(Config.setAccount(account));
        });

        it('select => {networkId, account}', async () => {
            const selected = Config.select(store.getState());
            assert.deepEqual(selected, { id: 0, networkId, account });
        });

        it('selectNetworkId => 42', async () => {
            const selected = Config.selectNetworkId(store.getState());
            assert.equal(selected, networkId);
            store.dispatch(Config.setNetworkId(undefined));
            const selected2 = Config.selectNetworkId(store.getState());
            assert.equal(selected2, undefined);
        });

        it('selectAccount', async () => {
            const selected = Config.selectAccount(store.getState());
            assert.equal(selected, account);
            store.dispatch(Config.setAccount(undefined));
            const selected2 = Config.selectAccount(store.getState());
            assert.equal(selected2, undefined);
        });

        it('selectNetwork => 42', async () => {
            const network = {
                networkId,
                web3: new Web3('http://locahost:8545'),
            };
            store.dispatch(Network.create(network));

            const selected = Config.selectNetwork(store.getState());
            assert.equal(selected!.networkId, networkId);
        });
    });
});

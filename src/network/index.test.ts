import { assert } from 'chai';
import Web3 from 'web3';

import { createStore, StoreType } from '../store';
import { Network, Block } from '../index';
import { assertDeepEqual } from '../test/utils';

const networkId = '1337';
const web3 = new Web3('http://locahost:8545');
const network = {
    networkId,
    web3,
    web3Sender: web3,
    gasLimit: 12000000,
};

describe('network.actions', () => {
    let store: StoreType;

    beforeEach(() => {
        store = createStore();
    });

    describe('selectors:empty', () => {
        it('selectSingle(state, id) => undefined', async () => {
            const selected = Network.selectByIdSingle(store.getState(), '');
            assert.equal(selected, undefined);
        });

        it('selectByIdSingle(state, [id]) => []', async () => {
            const selected = Network.selectByIdMany(store.getState(), ['']);
            assert.deepEqual(selected, [null]);
        });

        it('selectSingleBlocks(state, blockId) => null', async () => {
            const selected = Network.selectBlocks(store.getState(), '');
            assert.equal(selected, null);
        });
        it('selectSingleTransactions(state, blockId) => null', async () => {
            const selected = Network.selectTransactions(store.getState(), '');
            assert.equal(selected, null);
        });
    });

    describe('selectors:memoization', () => {
        it('selectSingle(state, id)', async () => {
            //Test payload != selected reference
            store.dispatch(Network.create(network));
            const selected1 = Network.selectByIdSingle(store.getState(), network.networkId);

            assert.notEqual(selected1, network, 'unequal reference');
            assertDeepEqual(selected1, network, ['web3', 'web3Sender', 'multicallContract'], 'equal deep values');
        });
    });

    describe('selectors:latestBlock', () => {
        it('selectLatestBlock(state, id)', async () => {
            const block1 = { networkId, number: 1 };
            const blockValidated1 = Block.validate(block1);
            store.dispatch(Network.create(network));
            store.dispatch(Block.create(block1));

            const selected1 = Network.selectLatestBlock(store.getState(), network.networkId);

            assert.deepEqual(selected1, blockValidated1, 'latestBlock != blockValidated1');
        });

        it('selectLatestBlockNumber(state, id)', async () => {
            const block1 = { networkId, number: 1 };
            store.dispatch(Network.create(network));
            store.dispatch(Block.create(block1));

            const selected1 = Network.selectLatestBlockNumber(store.getState(), network.networkId);

            assert.deepEqual(selected1, 1, 'latestBlockNumber != 1');
        });
    });

    describe('selectors:many', () => {
        it('selectMany(state)', async () => {
            store.dispatch(Network.create(network));
            const expected = network;
            //console.debug(store.getState().web3Redux['Network'].itemsById[network.networkId])

            //State
            assertDeepEqual(
                store.getState().web3Redux['Network'].itemsById[network.networkId],
                expected,
                ['web3', 'web3Sender', 'multicallContract'],
                'state.web3Redux.Network.itemsById',
            );

            //Network.selectMany
            assertDeepEqual(
                Network.selectByIdMany(store.getState(), [network.networkId]),
                [expected],
                ['web3', 'web3Sender', 'multicallContract'],
                'Network.selectMany([networkId])',
            );

            assertDeepEqual(
                Network.selectByIdMany(store.getState()),
                [expected],
                ['web3', 'web3Sender', 'multicallContract'],
                'Network.selectMany()',
            );
        });
    });
});

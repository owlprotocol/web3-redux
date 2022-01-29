import { assert } from 'chai';
import Web3 from 'web3';
import ganache from 'ganache-core';

import { ganacheLogger, mineBlock, sleep } from '../utils';
import { create as createNetwork } from '../network/actions';
import { createStore, StoreType } from '../store';
import { BlockHeader, BlockTransaction, validate } from './model';

import { name } from './common';
import { networkId } from '../test/data';
import fetchAction from './actions/fetch';
import subscribeAction from './actions/subscribe';
import unsubscribeAction from './actions/unsubscribe';
import { selectByIdSingle, selectByIdMany } from './selectors';

describe(`${name}.integration`, () => {
    let web3: Web3; //Web3 loaded from store
    let accounts: string[];
    let store: StoreType;
    let rpcLogger: ReturnType<typeof ganacheLogger>;
    let ethGetBlockByNumber = 0;
    let ethSubscribe = 0;
    let ethUnsubscribe = 0;

    before(async () => {
        const networkIdInt = parseInt(networkId);
        rpcLogger = ganacheLogger();
        const ethGetBlockByNumberIncr = () => (ethGetBlockByNumber += 1);
        const ethSubscribeIncr = () => (ethSubscribe += 1);
        const ethUnsubscribeIncr = () => (ethUnsubscribe += 1);
        rpcLogger.addListener('eth_getBlockByNumber', ethGetBlockByNumberIncr);
        rpcLogger.addListener('eth_subscribe', ethSubscribeIncr);
        rpcLogger.addListener('eth_unsubscribe', ethUnsubscribeIncr);

        const provider = ganache.provider({
            networkId: networkIdInt,
            logger: rpcLogger,
            verbose: true,
        });
        //@ts-ignore
        web3 = new Web3(provider);
        accounts = await web3.eth.getAccounts();
    });

    beforeEach(async () => {
        store = createStore();
        store.dispatch(createNetwork({ networkId, web3 }));
    });

    /*
    it('BlockSagas.fetch({returnTransactionObjects:false})', async () => {
        const gen = BlockSagas.fetch(Block.fetch({ networkId, blockHashOrBlockNumber: 'latest' }));
        const block = await web3.eth.getBlock('latest');
        const expectedBlock: BlockTransactionString = { ...block, networkId, id: `${networkId}-${block.number}` };
        const expectedPutBlockAction = put(Block.create(expectedBlock));

        gen.next(); //select web3 TODO: pass mock state
        gen.next(); //call web3
        //@ts-ignore
        const putBlock = gen.next(expectedBlock).value;
        assert.deepEqual(putBlock, expectedPutBlockAction);
    });

    it('BlockSagas.fetch({returnTransactionObjects:true})', async () => {
        const gen = BlockSagas.fetch(
            Block.fetch({ networkId, blockHashOrBlockNumber: 'latest', returnTransactionObjects: true }),
        );
        const block = await web3.eth.getBlock('latest', true);
        //@ts-ignore
        const expectedBlock: BlockTransactionObject = { ...block, networkId, id: `${networkId}-${block.number}` };
        const expectedPutBlockAction = put(Block.create(expectedBlock));

        gen.next(); //select web3 TODO: pass mock state
        gen.next(); //call web3
        //@ts-ignore
        const putBlock = gen.next(expectedBlock).value;
        assert.deepEqual(putBlock, expectedPutBlockAction);
    });
    */

    describe('fetch', () => {
        it('({returnTransactionObjects:true})', async () => {
            store.dispatch(
                fetchAction({ networkId, blockHashOrBlockNumber: 'latest', returnTransactionObjects: true }),
            );
            const expected = validate({ ...(await web3.eth.getBlock('latest')), networkId });
            const selected = selectByIdSingle(store.getState(), { networkId, number: expected.number });
            assert.deepEqual({ ...selected, transactions: [] }, expected as any);
        });

        it('({returnTransactionObjects:false})', async () => {
            store.dispatch(
                fetchAction({ networkId, blockHashOrBlockNumber: 'latest', returnTransactionObjects: false }),
            );
            const expected = validate({ ...(await web3.eth.getBlock('latest')), networkId });
            const selected = selectByIdSingle(store.getState(), { networkId, number: expected.number });
            assert.deepEqual({ ...selected, transactions: [] }, expected as any);
        });

        it('rpc calls', async () => {
            const ethGetBlockByNumberInitial = ethGetBlockByNumber;
            await mineBlock(web3);
            store.dispatch(
                fetchAction({ networkId, blockHashOrBlockNumber: 'latest', returnTransactionObjects: false }),
            );
            //Count rpc calls since test began
            assert.equal(
                ethGetBlockByNumber - ethGetBlockByNumberInitial,
                1,
                'eth_getBlockByNumber rpc calls != expected',
            );
        });
    });

    describe('subscribe', () => {
        it('({returnTransactionObjects:false})', async () => {
            store.dispatch(subscribeAction({ networkId, returnTransactionObjects: false }));
            const expectedBlocks: BlockHeader[] = [];
            const subscription = web3.eth.subscribe('newBlockHeaders').on('data', (block: any) => {
                expectedBlocks.push(validate({ ...block, networkId, transactions: [] }));
            });

            await mineBlock(web3);
            await mineBlock(web3);
            store.dispatch(unsubscribeAction(networkId));
            subscription.unsubscribe();
            //Block ignored
            await mineBlock(web3);

            const blocks = selectByIdMany(store.getState());
            assert.equal(blocks.length, 2, 'blocks.length != expected');
            assert.deepEqual(blocks, expectedBlocks);
        });

        it('({returnTransactionObjects:false}) - rpc calls', async () => {
            const ethGetBlockByNumberInitial = ethGetBlockByNumber;
            const ethSubscribeInitial = ethSubscribe;
            store.dispatch(subscribeAction({ networkId, returnTransactionObjects: false }));

            assert.equal(ethSubscribe - ethSubscribeInitial, 1, 'eth_subscribe rpc calls != expected');
            //No getBlockByNumber calls as relying on subscription
            assert.equal(
                ethGetBlockByNumber - ethGetBlockByNumberInitial,
                0,
                'eth_getBlockByNumber rpc calls != expected',
            );
        });

        it.skip('({returnTransactionObjects:true})', async () => {
            store.dispatch(subscribeAction({ networkId, returnTransactionObjects: true }));
            const expectedBlocksPromise: Promise<BlockTransaction>[] = [];
            const subscription = web3.eth.subscribe('newBlockHeaders').on('data', (block: any) => {
                //@ts-ignore
                expectedBlocksPromise.push(web3.eth.getBlock(block.number, true));
            });

            //Sending a transactions also mines a block
            await web3.eth.sendTransaction({ from: accounts[0], to: accounts[0], value: '100' }); //mines a block
            await mineBlock(web3);
            await sleep(150); // leave time to fetch

            store.dispatch(unsubscribeAction(networkId));
            subscription.unsubscribe();

            //Block ignored
            await mineBlock(web3);

            const promiseResults = await Promise.all(expectedBlocksPromise);
            const expectedBlocks = promiseResults.map((b) =>
                validate({ ...b, networkId, transactions: [] }),
            ) as BlockTransaction[];

            const blocks = selectByIdMany(store.getState()).map((b) => {
                return { ...b, transactions: [] };
            });
            assert.equal(blocks.length, 2, 'blocks.length != expected');
            assert.deepEqual(blocks, expectedBlocks as any);

            const expectedBlockTransactions = promiseResults.map((b) => validate({ ...b, networkId }));
            const blockTransactions = selectByIdMany(store.getState());
            assert.deepEqual(blockTransactions, expectedBlockTransactions, 'Block with transactions');
        });

        it('({returnTransactionObjects:true}) - rpc calls', async () => {
            const ethGetBlockByNumberInitial = ethGetBlockByNumber;
            const ethSubscribeInitial = ethSubscribe;
            store.dispatch(subscribeAction({ networkId, returnTransactionObjects: true }));

            await mineBlock(web3);
            store.dispatch(unsubscribeAction(networkId));
            //Block ignored
            await mineBlock(web3);

            assert.equal(ethSubscribe - ethSubscribeInitial, 1, 'eth_subscribe rpc calls != expected');
            //1 block mined while subscription active
            assert.equal(
                ethGetBlockByNumber - ethGetBlockByNumberInitial,
                1,
                'eth_getBlockByNumber rpc calls != expected',
            );
        });

        it('subscribe - multiple networks', async () => {
            const network1 = networkId;
            const network2 = '1338';
            const provider2 = ganache.provider({
                blockTime: 1,
                networkId: 1338,
            });
            //@ts-ignore
            const web3Network2 = new Web3(provider2);

            store.dispatch(createNetwork({ networkId: network1, web3 }));
            store.dispatch(createNetwork({ networkId: network2, web3: web3Network2 }));
            store.dispatch(subscribeAction({ networkId: network1, returnTransactionObjects: false }));
            store.dispatch(subscribeAction({ networkId: network2, returnTransactionObjects: false }));

            const expectedBlocks1: BlockHeader[] = [];
            const subscription1 = web3.eth.subscribe('newBlockHeaders').on('data', (block: any) => {
                expectedBlocks1.push(validate({ ...block, networkId: network1, transactions: [] }));
            });

            const expectedBlocks2: BlockHeader[] = [];
            const subscription2 = web3Network2.eth.subscribe('newBlockHeaders').on('data', (block: any) => {
                expectedBlocks2.push(validate({ ...block, networkId: network2, transactions: [] }));
            });

            await mineBlock(web3);
            await mineBlock(web3Network2);

            store.dispatch(unsubscribeAction(network1));
            subscription1.unsubscribe();

            let blocks = selectByIdMany(store.getState());
            assert.equal(blocks.length, 2, 'blocks.length != expected');
            assert.deepEqual(blocks, [...expectedBlocks1, ...expectedBlocks2]);

            await mineBlock(web3); //Ignored as subscription closed
            await mineBlock(web3Network2);

            store.dispatch(unsubscribeAction(network2));
            subscription2.unsubscribe();

            blocks = selectByIdMany(store.getState());
            assert.equal(blocks.length, 3, 'blocks.length != expected');
            assert.deepEqual(blocks, [...expectedBlocks1, ...expectedBlocks2]);
        });
    });
});

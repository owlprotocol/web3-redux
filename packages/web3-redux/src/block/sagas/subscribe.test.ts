import { assert } from 'chai';
import Web3 from 'web3';
import { testSaga } from 'redux-saga-test-plan';
import { subscribeSaga } from './subscribe.js';

import { getWeb3Provider } from '../../test/index.js';
import { mineBlock, sleep } from '../../utils/index.js';

import { createStore, StoreType } from '../../store.js';
import { BlockHeader, BlockTransaction, validate } from '../model/index.js';

import { name } from '../common.js';
import { subscribe as subscribeAction, unsubscribe as unsubscribeAction } from '../actions/index.js';
import { network1336 } from '../../network/data.js';

import BlockCRUD from '../crud.js';
import NetworkCRUD from '../../network/crud.js';

const networkId = network1336.networkId;
const web3 = network1336.web3!;

describe(`${name}/sagas/subscribe.test.ts`, () => {
    let accounts: string[];

    before(async () => {
        //@ts-ignore
        accounts = await web3.eth.getAccounts();
    });

    describe('unit', () => {
        it('subscribe(networkId)', async () => {
            const action = subscribeAction(networkId);
            //const channel = subscribeChannel(web3);
            testSaga(subscribeSaga, action)
                .next()
                .select(NetworkCRUD.selectors.selectByIdSingle, networkId)
                .next({ networkId, web3 });
            //.take(channel)
            //.next({ block1 })
            //.put(BlockCRUD.actions.create(block1, action.meta.uuid));
        });
    });

    describe('integration', () => {
        let store: StoreType;

        beforeEach(async () => {
            store = createStore();
            store.dispatch(NetworkCRUD.actions.create({ networkId, web3 }));
        });

        it('subscribe(networkId)', async () => {
            store.dispatch(subscribeAction(networkId));
            const expectedBlocks: BlockHeader[] = [];
            const subscription = web3.eth.subscribe('newBlockHeaders').on('data', (block: any) => {
                expectedBlocks.push(validate({ ...block, networkId }));
            });

            await mineBlock(web3);
            store.dispatch(unsubscribeAction(networkId));
            subscription.unsubscribe();
            //Block ignored
            await mineBlock(web3);

            const blocks = await BlockCRUD.db.all();
            assert.equal(blocks.length, 1, 'blocks.length != expected');
            assert.deepEqual(blocks, expectedBlocks);
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
            const expectedBlocks = promiseResults.map((b) => validate({ ...b, networkId })) as BlockTransaction[];

            const blocks = await BlockCRUD.db.all();
            assert.equal(blocks.length, 2, 'blocks.length != expected');
            assert.deepEqual(blocks, expectedBlocks as any);

            const expectedBlockTransactions = promiseResults.map((b) => validate({ ...b, networkId }));
            const blockTransactions = await BlockCRUD.db.all();
            assert.deepEqual(blockTransactions, expectedBlockTransactions, 'Block with transactions');
        });

        it.skip('subscribe - multiple networks', async () => {
            const network1 = networkId;
            const network2 = '1338';
            const provider2 = getWeb3Provider();
            //@ts-ignore
            const web3Network2 = new Web3(provider2);

            store.dispatch(NetworkCRUD.actions.create({ networkId: network1, web3 }));
            store.dispatch(NetworkCRUD.actions.create({ networkId: network2, web3: web3Network2 }));
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

            let blocks = await BlockCRUD.db.all();
            assert.equal(blocks.length, 2, 'blocks.length != expected');
            assert.deepEqual(blocks, [...expectedBlocks1, ...expectedBlocks2]);

            await mineBlock(web3); //Ignored as subscription closed
            await mineBlock(web3Network2);

            store.dispatch(unsubscribeAction(network2));
            subscription2.unsubscribe();

            blocks = await BlockCRUD.db.all();
            assert.equal(blocks.length, 3, 'blocks.length != expected');
            assert.deepEqual(blocks, [...expectedBlocks1, ...expectedBlocks2]);
        });
    });
});

describe(`${name}.subscribe.rpccalls`, () => {
    let store: StoreType;
    /*
    let rpcLogger: ReturnType<typeof ganacheLogger>;
    let ethGetBlockByNumber = 0;
    let ethSubscribe = 0;
    let ethUnsubscribe = 0;
    */

    before(async () => {
        /*
        rpcLogger = ganacheLogger();
        const ethGetBlockByNumberIncr = () => (ethGetBlockByNumber += 1);
        const ethSubscribeIncr = () => (ethSubscribe += 1);
        const ethUnsubscribeIncr = () => (ethUnsubscribe += 1);
        rpcLogger.addListener('eth_getBlockByNumber', ethGetBlockByNumberIncr);
        rpcLogger.addListener('eth_subscribe', ethSubscribeIncr);
        rpcLogger.addListener('eth_unsubscribe', ethUnsubscribeIncr);
        */
    });

    beforeEach(async () => {
        store = createStore();
        store.dispatch(NetworkCRUD.actions.create({ networkId, web3 }));
    });

    it.skip('(networkId) - rpc calls', async () => {
        //const ethGetBlockByNumberInitial = ethGetBlockByNumber;
        //const ethSubscribeInitial = ethSubscribe;
        store.dispatch(subscribeAction(networkId));

        //assert.equal(ethSubscribe - ethSubscribeInitial, 1, 'eth_subscribe rpc calls != expected');
        //No getBlockByNumber calls as relying on subscription
        //assert.equal(ethGetBlockByNumber - ethGetBlockByNumberInitial, 0, 'eth_getBlockByNumber rpc calls != expected');
    });

    it.skip('({returnTransactionObjects:true}) - rpc calls', async () => {
        //const ethGetBlockByNumberInitial = ethGetBlockByNumber;
        //const ethSubscribeInitial = ethSubscribe;
        store.dispatch(subscribeAction({ networkId, returnTransactionObjects: true }));

        await mineBlock(web3);
        store.dispatch(unsubscribeAction(networkId));
        //Block ignored
        await mineBlock(web3);

        //assert.equal(ethSubscribe - ethSubscribeInitial, 1, 'eth_subscribe rpc calls != expected');
        //1 block mined while subscription active
        //assert.equal(ethGetBlockByNumber - ethGetBlockByNumberInitial, 1, 'eth_getBlockByNumber rpc calls != expected');
    });
});

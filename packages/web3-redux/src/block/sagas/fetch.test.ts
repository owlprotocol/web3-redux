import { assert } from 'chai';
import Web3 from 'web3';
import { testSaga } from 'redux-saga-test-plan';
// eslint-disable-next-line import/no-unresolved
import { fetchSaga } from './fetch.js';
import getDB from '../../db.js';

import { getWeb3Provider } from '../../test/index.js';
import { mineBlock } from '../../utils/index.js';
import { createStore, StoreType } from '../../store.js';
import { validate } from '../model/index.js';

import { name } from '../common.js';
import { networkId } from '../../test/data.js';
import { fetch as fetchAction } from '../actions/index.js';
import NetworkCRUD from '../../network/crud.js';
import BlockCRUD from '../crud.js';

describe(`${name}/sagas/fetch.ts`, () => {
    let web3: Web3; //Web3 loaded from store

    before(() => {
        const provider = getWeb3Provider();
        //@ts-ignore
        web3 = new Web3(provider);
    });

    beforeEach(async () => { });

    describe('unit', () => {
        it('new block - by number', async () => {
            const item = { networkId, blockHashOrBlockNumber: 1, returnTransactionObjects: false };
            const action = fetchAction(item);
            testSaga(fetchSaga, action)
                .next()
                .call(BlockCRUD.db.get, { networkId, number: 1 })
                .next(undefined)
                .put(BlockCRUD.actions.create({ networkId, number: 1 }, action.meta.uuid))
                .next()
                .select(NetworkCRUD.selectors.select, networkId)
                .next({ networkId, web3 })
                .call(web3.eth.getBlock, 1, false)
                .next({ networkId, number: 1, hash: '0x1' })
                .put(BlockCRUD.actions.update({ networkId, number: 1, hash: '0x1' }, action.meta.uuid))
                .next()
                .isDone();
        });

        it('new block - by hash', async () => {
            const item = { networkId, blockHashOrBlockNumber: '0x1', returnTransactionObjects: false };
            const action = fetchAction(item);
            testSaga(fetchSaga, action)
                .next()
                .select(NetworkCRUD.selectors.select, networkId)
                .next({ networkId, web3 })
                .call(web3.eth.getBlock, '0x1', false)
                .next({ networkId, number: 1, hash: '0x1' })
                .put(BlockCRUD.actions.create({ networkId, number: 1, hash: '0x1' }, action.meta.uuid))
                .next()
                .isDone();
        });
    });

    describe('store', () => {
        let store: StoreType;

        beforeEach(async () => {
            store = createStore();
            store.dispatch(NetworkCRUD.actions.create({ networkId, web3 }));
        });

        describe('fetch', () => {
            it('({returnTransactionObjects:false})', async () => {
                await mineBlock(web3);

                store.dispatch(fetchAction({ networkId, blockHashOrBlockNumber: 1, returnTransactionObjects: false }));

                const expected = validate({ ...(await web3.eth.getBlock(1)), networkId });
                const selected = await BlockCRUD.db.get({ networkId, number: expected.number });
                assert.deepEqual({ ...selected }, expected as any);
            });
        });
    });
});

describe(`${name}.fetch.rpccalls`, () => {
    let web3: Web3; //Web3 loaded from store
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

        const provider = getWeb3Provider();
        //@ts-ignore
        web3 = new Web3(provider);
    });

    beforeEach(async () => {
        store = createStore();
        store.dispatch(NetworkCRUD.actions.create({ networkId, web3 }));
    });

    it.skip('rpc calls', async () => {
        //const ethGetBlockByNumberInitial = ethGetBlockByNumber;
        await mineBlock(web3);
        store.dispatch(fetchAction({ networkId, blockHashOrBlockNumber: 'latest', returnTransactionObjects: false }));
        //Count rpc calls since test began
        //assert.equal(ethGetBlockByNumber - ethGetBlockByNumberInitial, 1, 'eth_getBlockByNumber rpc calls != expected');
    });
});

//OLD TESTS
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

import { assert } from 'chai';
import Web3 from 'web3';
import { mineBlock, getWeb3Provider } from '../../utils';
import { create as createNetwork } from '../../network/actions';
import { createStore, StoreType } from '../../store';
import { validate } from '../model';

import { name } from '../common';
import { networkId } from '../../test/data';
import fetchAction from '../actions/fetch';
import { selectByIdSingle } from '../selectors';

describe(`${name}.fetch`, () => {
    let web3: Web3; //Web3 loaded from store
    let store: StoreType;

    before(() => {
        const provider = getWeb3Provider();
        //@ts-ignore
        web3 = new Web3(provider);
    });

    beforeEach(async () => {
        ({ store } = createStore());
        store.dispatch(createNetwork({ networkId, web3 }));
    });

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
        ({ store } = createStore());
        store.dispatch(createNetwork({ networkId, web3 }));
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

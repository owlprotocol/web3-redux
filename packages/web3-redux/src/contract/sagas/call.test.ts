import { assert } from 'chai';
import Web3 from 'web3';
import { Contract as Web3Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import { cloneDeep } from 'lodash';
import { getWeb3Provider } from '../../test/index.js';
import { sleep } from '../../utils/index.js';

import { name } from '../common.js';

import * as BlockNumberArtifact from '../../abis/BlockNumber.json';
import { networkId } from '../../test/data.js';

import { createStore, StoreType } from '../../store.js';
import { create as createNetwork } from '../../network/index.js';

import { selectContractCall } from '../selectors/index.js';
import { create as createAction, call as callAction } from '../actions/index.js';

describe(`${name}.sagas.call`, () => {
    let web3: Web3; //Web3 loaded from store
    let web3Sender: Web3;
    let accounts: string[];
    let store: StoreType;
    let web3Contract: Web3Contract;

    let address: string;

    ///let rpcLogger: ReturnType<typeof ganacheLogger>;
    //let ethCall = 0;
    //let rpcBatch = 0;

    before(async () => {
        //rpcLogger = ganacheLogger();

        const provider = getWeb3Provider(); //TODO: Track logging
        //@ts-ignore
        web3 = new Web3(provider);
        //@ts-ignore
        web3Sender = new Web3(provider);
        accounts = await web3.eth.getAccounts();

        /*
        const ethCallIncr = () => (ethCall += 1);
        const rpcBatchIncr = () => (rpcBatch += 1);
        rpcLogger.addListener('eth_call', ethCallIncr);
        rpcLogger.addListener('rpc_batch', rpcBatchIncr);
        */
    });

    beforeEach(async () => {
        ({ store } = createStore());
        store.dispatch(createNetwork({ networkId, web3, web3Sender }));

        const tx = new web3.eth.Contract(cloneDeep(BlockNumberArtifact.abi) as AbiItem[]).deploy({
            data: BlockNumberArtifact.bytecode,
        });
        const gas = await tx.estimateGas();
        web3Contract = await tx.send({ from: accounts[0], gas, gasPrice: '875000000' });
        address = web3Contract.options.address;

        store.dispatch(
            createAction({
                networkId,
                address,
                abi: cloneDeep(BlockNumberArtifact.abi) as AbiItem[],
            }),
        );
    });

    describe('call', () => {
        it('()', async () => {
            //const ethCallInitial = ethCall;
            //const rpcBatchInitial = rpcBatch;

            const tx2 = await web3Contract.methods.setValue(42);
            const gas2 = await tx2.estimateGas();
            await tx2.send({ from: accounts[0], gas: gas2, gasPrice: '875000000' });

            store.dispatch(
                callAction({
                    networkId,
                    address,
                    method: 'getValue',
                }),
            );
            await sleep(300);

            //Selector
            const value = selectContractCall(store.getState(), { networkId, address }, 'getValue');

            assert.equal(value, 42, 'getValue');
            assert.strictEqual(value, '42', 'getValue');
            //assert.equal(rpcBatch - rpcBatchInitial, 0, 'rpc_batch rpc calls != expected');
            //assert.equal(ethCall - ethCallInitial, 1, 'eth_call rpc calls != expected');
        });
    });
});

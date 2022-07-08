import { assert } from 'chai';
import Web3 from 'web3';
import type { Contract as Web3Contract } from 'web3-eth-contract';
import { testSaga } from 'redux-saga-test-plan';
import { callSaga } from './call.js';
import { cloneDeep } from '../../utils/lodash/index.js';
import { AbiItem } from '../../utils/web3-utils/index.js';
import { getWeb3Provider } from '../../test/index.js';
import { sleep } from '../../utils/index.js';

import { name } from '../common.js';

import { BlockNumber as BlockNumberArtifact } from '../../abis/index.js';
import { networkId } from '../../test/data.js';

import { createStore, StoreType } from '../../store.js';
import { call as callAction } from '../actions/index.js';
import EthCallCRUD from '../../ethcall/crud.js';
import NetworkCRUD from '../../network/crud.js';
import ContractCRUD from '../crud.js';

describe(`${name}/sagas/call.ts`, () => {
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

    describe('unit', () => {
        it('call - success', async () => {
            const web3Contract = await new web3.eth.Contract(cloneDeep(BlockNumberArtifact.abi) as AbiItem[])
                .deploy({
                    data: BlockNumberArtifact.bytecode,
                })
                .send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
            const address = web3Contract.options.address;

            const tx = web3Contract.methods.getValue();
            const data = tx.encodeABI();
            const gas = await tx.estimateGas();

            const action = callAction({
                networkId,
                address,
                method: 'getValue',
            });
            const ethCall = EthCallCRUD.validate({
                networkId,
                from: undefined,
                to: address,
                defaultBlock: undefined,
                data,
            });
            const returnValue = await tx.call({ ...ethCall, gas });
            testSaga(callSaga, action)
                .next()
                .select(NetworkCRUD.selectors.selectByIdSingle, networkId)
                .next({ networkId })
                .select(ContractCRUD.selectors.selectByIdSingle, { networkId, address })
                .next({ web3Contract, address })
                .put(EthCallCRUD.actions.create({ ...ethCall, status: 'LOADING' }, action.meta.uuid))
                .next()
                //.call(tx.estimateGas, { ...ethCall })
                .next(gas)
                //.call(tx.call, { ...ethCall, gas })
                .next(returnValue)
                .put(
                    EthCallCRUD.actions.update(
                        {
                            ...ethCall,
                            error: undefined,
                            returnValue: returnValue,
                            status: 'SUCCESS',
                            lastUpdated: Date.now(),
                        },
                        action.meta.uuid,
                    ),
                )
                .next()
                .isDone();
        });
    });

    describe('store', () => {
        beforeEach(async () => {
            ({ store } = createStore());
            store.dispatch(NetworkCRUD.actions.create({ networkId, web3, web3Sender }));

            const tx = new web3.eth.Contract(cloneDeep(BlockNumberArtifact.abi) as AbiItem[]).deploy({
                data: BlockNumberArtifact.bytecode,
            });
            const gas = await tx.estimateGas();
            web3Contract = await tx.send({ from: accounts[0], gas, gasPrice: '875000000' });
            address = web3Contract.options.address;

            store.dispatch(
                ContractCRUD.actions.create({
                    networkId,
                    address,
                    abi: cloneDeep(BlockNumberArtifact.abi) as AbiItem[],
                }),
            );
        });

        describe('call', () => {
            it('(): error contract revert', async () => {
                //Error caused by contract revert
                store.dispatch(
                    callAction({
                        networkId,
                        address,
                        method: 'revertTx',
                    }),
                );
                await sleep(300);

                //Call an invalid function
                const ethCallId = selectEthCallId(store.getState(), { networkId, address }, 'revertTx');
                const ethCall = EthCallCRUD.selectors.selectByIdSingle(store.getState(), ethCallId)!;
                const value = ethCall.returnValue;
                const error = ethCall.error;

                assert.isUndefined(value, 'returnValue');
                assert.isDefined(error, 'error');
                assert.equal(
                    error?.message,
                    'VM Exception while processing transaction: revert Transaction reverted',
                    'error.message',
                );
            });

            it('(): success', async () => {
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
});

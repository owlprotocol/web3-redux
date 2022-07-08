import { assert } from 'chai';
import Web3 from 'web3';
import type { Contract as Web3Contract } from 'web3-eth-contract';
import { testSaga } from 'redux-saga-test-plan';

import eventGetPast from './eventGetPast.js';
import { cloneDeep } from '../../utils/lodash/index.js';
import { AbiItem } from '../../utils/web3-utils/index.js';

import { getWeb3Provider } from '../../test/index.js';
import { name } from '../common.js';
import { networkId } from '../../test/data.js';

import { BlockNumber as BlockNumberArtifact } from '../../abis/index.js';
import { mineBlocks, sleep } from '../../utils/index.js';

import { createStore, StoreType } from '../../store.js';
import { validate as validatedContractEvent } from '../../contractevent/model/index.js';
import { eventGetPast as eventGetPastAction, eventGetPastRaw as eventGetPastRawAction } from '../actions/index.js';
import NetworkCRUD from '../../network/crud.js';
import ContractCRUD from '../crud.js';

describe(`${name}/sagas/eventGetPast.test.ts`, () => {
    let web3: Web3; //Web3 loaded from store
    let web3Sender: Web3;
    let accounts: string[];
    let store: StoreType;
    let web3Contract: Web3Contract;

    let address: string;

    before(async () => {
        const provider = getWeb3Provider();
        //@ts-ignore
        web3 = new Web3(provider);
        //@ts-ignore
        web3Sender = new Web3(provider);
        accounts = await web3.eth.getAccounts();
    });

    describe('unit', () => {
        it('eventGetPast - success', async () => {
            const web3Contract = await new web3.eth.Contract(cloneDeep(BlockNumberArtifact.abi) as AbiItem[])
                .deploy({
                    data: BlockNumberArtifact.bytecode,
                })
                .send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
            const address = web3Contract.options.address;

            const action = eventGetPastAction({
                networkId,
                address,
                eventName: 'NewValue',
            });

            await mineBlocks(web3, 1);
            const blockNo = await web3.eth.getBlockNumber();
            testSaga(eventGetPast, action)
                .next()
                .select(NetworkCRUD.selectors.selectByIdSingle, networkId)
                .next({ networkId, web3 })
                .select(ContractCRUD.selectors.selectByIdSingle, { networkId, address })
                .next({ web3Contract, address })
                .call(web3.eth.getBlockNumber)
                .next(blockNo)
                .put(
                    eventGetPastRawAction(
                        {
                            networkId,
                            address,
                            eventName: 'NewValue',
                            fromBlock: 0,
                            toBlock: blockNo,
                            max: 100,
                        },
                        action.meta.uuid,
                    ),
                );
        });
    });
    describe('store', () => {
        beforeEach(async () => {
            ({ store } = createStore());
            store.dispatch(NetworkCRUD.actions.create({ networkId, web3, web3Sender }));

            web3Contract = await new web3.eth.Contract(cloneDeep(BlockNumberArtifact.abi) as AbiItem[])
                .deploy({
                    data: BlockNumberArtifact.bytecode,
                })
                .send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
            address = web3Contract.options.address;

            store.dispatch(
                ContractCRUD.actions.create({
                    networkId,
                    address,
                    abi: cloneDeep(BlockNumberArtifact.abi) as AbiItem[],
                }),
            );
        });

        describe('eventGetPast', () => {
            it('default', async () => {
                const expectedEvents: any[] = [];
                web3Contract.events['NewValue']().on('data', (event: any) => {
                    expectedEvents.push(
                        validatedContractEvent({
                            networkId,
                            address,
                            name: 'NewValue',
                            ...event,
                        }),
                    );
                });

                await web3Contract.methods
                    .setValue(42)
                    .send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });

                store.dispatch(
                    eventGetPastAction({
                        networkId,
                        address,
                        eventName: 'NewValue',
                    }),
                );

                await sleep(1000);

                const events1 = selectContractEvents(store.getState(), { networkId, address }, 'NewValue');
                const events1Cleaned = events1?.map((e) => {
                    return { ...e, indexIds: [e.indexIds![1], e.indexIds![2]] };
                });
                assert.deepEqual(events1Cleaned, expectedEvents);
                console.debug(store.getState().web3Redux.ContractEventIndex);
                console.debug(store.getState().web3Redux.ContractEventIndexIds);
                console.debug(store.getState().web3Redux.ContractEventIndexIds.indexes);
            });

            it('max=1', async () => {
                let expectedEvents: any[] = [];
                web3Contract.events['NewValue']().on('data', (event: any) => {
                    expectedEvents.push(
                        validatedContractEvent({
                            networkId,
                            address,
                            name: 'NewValue',
                            ...event,
                        }),
                    );
                });

                await mineBlocks(web3, 5);
                await web3Contract.methods
                    .setValue(42)
                    .send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
                await mineBlocks(web3, 5);
                await web3Contract.methods
                    .setValue(69)
                    .send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });

                store.dispatch(
                    eventGetPastAction({
                        networkId,
                        address,
                        eventName: 'NewValue',
                        max: 1,
                        blockBatch: 1,
                    }),
                );

                await sleep(1000);

                assert.equal(expectedEvents.length, 2);
                //only last emitted event, selected
                expectedEvents = [expectedEvents[expectedEvents.length - 1]];
                const events1 = selectContractEvents(store.getState(), { networkId, address }, 'NewValue');
                const events1Cleaned = events1?.map((e) => {
                    return { ...e, indexIds: [e.indexIds![1], e.indexIds![2]] };
                });
                assert.deepEqual(events1Cleaned, expectedEvents);
            });
        });
    });
});

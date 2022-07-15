import { assert } from 'chai';
import type { Contract as Web3Contract } from 'web3-eth-contract';
import { testSaga } from 'redux-saga-test-plan';
import { mineUpTo, mine } from '@nomicfoundation/hardhat-network-helpers';

import eventGetPast, { batchGenerator } from './eventGetPast.js';
import { AbiItem } from '../../utils/web3-utils/index.js';

import { name } from '../common.js';

import { BlockNumberArtifact } from '../../abis/index.js';
import { sleep } from '../../utils/index.js';

import { createStore, StoreType } from '../../store.js';
import { eventGetPast as eventGetPastAction, eventGetPastRaw as eventGetPastRawAction } from '../actions/index.js';
import NetworkCRUD from '../../network/crud.js';
import ContractCRUD from '../crud.js';
import ContractEventCRUD from '../../contractevent/crud.js';
import { network1336 } from '../../network/data.js';

const networkId = network1336.networkId;
const web3 = network1336.web3!;

describe(`${name}/sagas/eventGetPast.test.ts`, () => {
    let accounts: string[];
    let store: StoreType;

    let web3Contract: Web3Contract;
    let address: string;

    before(async () => {
        accounts = await web3.eth.getAccounts();
    });

    beforeEach(async () => {
        web3Contract = await new web3.eth.Contract(BlockNumberArtifact.abi as AbiItem[])
            .deploy({
                data: BlockNumberArtifact.bytecode,
            })
            .send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
        address = web3Contract.options.address.toLowerCase();
    });

    describe('batchGenerator', () => {
        it('11-32 batch:10', () => {
            const gen = batchGenerator(11, 32, 10);
            assert.deepEqual(gen.next().value, { from: 30, to: 32 });
            assert.deepEqual(gen.next().value, { from: 20, to: 29 });
            assert.deepEqual(gen.next().value, { from: 10, to: 19 });
            assert.isTrue(gen.next().done);
        });

        it('0-5 batch:10', () => {
            const gen = batchGenerator(0, 5, 10);
            assert.deepEqual(gen.next().value, { from: 0, to: 5 });
            assert.isTrue(gen.next().done);
        });

        it('0-15 batch:10', () => {
            const gen = batchGenerator(0, 15, 10);
            assert.deepEqual(gen.next().value, { from: 10, to: 15 });
            assert.deepEqual(gen.next().value, { from: 0, to: 9 });
            assert.isTrue(gen.next().done);
        });
    });

    describe('unit', () => {
        it('eventGetPast - latestBlock', async () => {
            const action = eventGetPastAction({
                networkId,
                address,
                eventName: 'NewValue',
                fromBlock: 0,
                blockBatch: 10000,
            });

            const blockNumber = await web3.eth.getBlockNumber();

            testSaga(eventGetPast, action)
                .next()
                .select(NetworkCRUD.selectors.selectByIdSingle, networkId)
                .next(network1336)
                .select(ContractCRUD.selectors.selectByIdSingle, { networkId, address })
                .next({ web3Contract, address })
                .call(web3.eth.getBlockNumber)
                .next(blockNumber)
                .put(
                    eventGetPastRawAction(
                        {
                            networkId,
                            address,
                            eventName: 'NewValue',
                            fromBlock: 0,
                            toBlock: blockNumber,
                        },
                        action.meta.uuid,
                    ),
                )
                .next()
                .isDone();
        });
        it('eventGetPast - batch', async () => {
            const action = eventGetPastAction({
                networkId,
                address,
                eventName: 'NewValue',
                fromBlock: 0,
                toBlock: 31,
                blockBatch: 10,
            });

            await mineUpTo(31);
            testSaga(eventGetPast, action)
                .next()
                .select(NetworkCRUD.selectors.selectByIdSingle, networkId)
                .next(network1336)
                .select(ContractCRUD.selectors.selectByIdSingle, { networkId, address })
                .next({ web3Contract, address })
                .put(
                    eventGetPastRawAction(
                        {
                            networkId,
                            address,
                            eventName: 'NewValue',
                            fromBlock: 30,
                            toBlock: 31,
                        },
                        action.meta.uuid,
                    ),
                )
                .next()
                .put(
                    eventGetPastRawAction(
                        {
                            networkId,
                            address,
                            eventName: 'NewValue',
                            fromBlock: 20,
                            toBlock: 29,
                        },
                        action.meta.uuid,
                    ),
                )
                .next()
                .put(
                    eventGetPastRawAction(
                        {
                            networkId,
                            address,
                            eventName: 'NewValue',
                            fromBlock: 10,
                            toBlock: 19,
                        },
                        action.meta.uuid,
                    ),
                )
                .next()
                .put(
                    eventGetPastRawAction(
                        {
                            networkId,
                            address,
                            eventName: 'NewValue',
                            fromBlock: 0,
                            toBlock: 9,
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
            store = createStore();
            store.dispatch(NetworkCRUD.actions.create(network1336));
            store.dispatch(
                ContractCRUD.actions.create({
                    networkId,
                    address,
                    abi: BlockNumberArtifact.abi as AbiItem[],
                }),
            );
        });

        describe('eventGetPast', () => {
            it.skip('default', async () => {
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

                await sleep(2000);

                const expectedEvents = (await web3Contract.getPastEvents('NewValue')).map((e) => {
                    return {
                        ...e,
                        networkId,
                        address,
                        name: 'NewValue',
                        topic0: undefined,
                        topic1: undefined,
                        topic2: undefined,
                        topic3: undefined,
                    };
                });
                const events1 = await ContractEventCRUD.db.where({ networkId, address, name: 'NewValue' });
                assert.deepEqual(events1, expectedEvents);
            });
        });
    });
});

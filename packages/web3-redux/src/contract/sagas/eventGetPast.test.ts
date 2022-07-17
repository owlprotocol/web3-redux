import { assert } from 'chai';
import type { Contract as Web3Contract } from 'web3-eth-contract';
import { testSaga } from 'redux-saga-test-plan';
import { mineUpTo } from '@nomicfoundation/hardhat-network-helpers';

import eventGetPast, { findBuckets, splitBucket } from './eventGetPast.js';
import { AbiItem } from '../../utils/web3-utils/index.js';

import { name } from '../common.js';

import { BlockNumberArtifact } from '../../abis/index.js';
import { sleep } from '../../utils/index.js';

import { createStore, StoreType } from '../../store.js';
import {
    eventGetPast as eventGetPastAction,
    eventGetPastRawAction as eventGetPastRawAction,
} from '../actions/index.js';
import NetworkCRUD from '../../network/crud.js';
import ContractCRUD from '../crud.js';
import ContractEventCRUD from '../../contractevent/crud.js';
import { network1336 } from '../../network/data.js';
import { ADDRESS_0 } from '../../data.js';

const networkId = network1336.networkId;
const web3 = network1336.web3!;

describe(`${name}/sagas/eventGetPast.test.ts`, () => {
    let accounts: string[];

    before(async () => {
        accounts = await web3.eth.getAccounts();
    });

    describe('findBuckets', () => {
        it('0-1557', () => {
            const gen = findBuckets(0, 1557);
            assert.deepEqual(gen.next().value, { from: 1550, to: 1557 });
            assert.deepEqual(gen.next().value, { from: 1500, to: 1550 });
            assert.deepEqual(gen.next().value, { from: 1000, to: 1500 });
            assert.deepEqual(gen.next().value, { from: 0, to: 1000 });
            assert.isTrue(gen.next().done);
        });

        it('115-1557', () => {
            const gen = findBuckets(115, 1557);
            assert.deepEqual(gen.next().value, { from: 1550, to: 1557 });
            assert.deepEqual(gen.next().value, { from: 1500, to: 1550 });
            assert.deepEqual(gen.next().value, { from: 1000, to: 1500 });
            assert.deepEqual(gen.next().value, { from: 500, to: 1000 });
            assert.deepEqual(gen.next().value, { from: 400, to: 500 });
            assert.deepEqual(gen.next().value, { from: 300, to: 400 });
            assert.deepEqual(gen.next().value, { from: 200, to: 300 });
            assert.deepEqual(gen.next().value, { from: 150, to: 200 });
            assert.deepEqual(gen.next().value, { from: 140, to: 150 });
            assert.deepEqual(gen.next().value, { from: 130, to: 140 });
            assert.deepEqual(gen.next().value, { from: 120, to: 130 });
            assert.deepEqual(gen.next().value, { from: 115, to: 120 });
            assert.isTrue(gen.next().done);
        });
    });

    describe('splitBucket', () => {
        it('50-100', () => {
            const gen = splitBucket(50, 100);
            assert.deepEqual(gen.next().value, { from: 90, to: 100 });
            assert.deepEqual(gen.next().value, { from: 80, to: 90 });
            assert.deepEqual(gen.next().value, { from: 70, to: 80 });
            assert.deepEqual(gen.next().value, { from: 60, to: 70 });
            assert.deepEqual(gen.next().value, { from: 50, to: 60 });
            assert.isTrue(gen.next().done);
        });
    });

    describe('unit', () => {
        const address = ADDRESS_0;
        const web3Contract = new web3.eth.Contract(BlockNumberArtifact.abi as AbiItem[], address);

        it('eventGetPast - latestBlock', async () => {
            const action = eventGetPastAction({
                networkId,
                address,
                eventName: 'NewValue',
                fromBlock: 0,
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
        let web3Contract: Web3Contract;
        let address: string;
        let store: StoreType;

        beforeEach(async () => {
            web3Contract = await new web3.eth.Contract(BlockNumberArtifact.abi as AbiItem[])
                .deploy({
                    data: BlockNumberArtifact.bytecode,
                })
                .send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
            address = web3Contract.options.address.toLowerCase();

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

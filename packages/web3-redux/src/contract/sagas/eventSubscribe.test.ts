import { assert } from 'chai';
import Web3 from 'web3';
import type { Contract as Web3Contract } from 'web3-eth-contract';
import { cloneDeep } from '../../utils/lodash/index.js';
import { AbiItem } from '../../utils/web3-utils/index.js';

import { getWeb3Provider } from '../../test/index.js';

import { name } from '../common.js';
import { networkId } from '../../test/data.js';

import { BlockNumber as BlockNumberArtifact } from '../../abis/index.js';

import { createStore, StoreType } from '../../store.js';
import { create as createNetwork } from '../../network/index.js';
import { validate as validatedContractEvent } from '../../contractevent/model/index.js';

import { ContractId } from '../model/index.js';
import { selectContractEvents } from '../selectors/index.js';
import { create as createAction, eventSubscribe as eventSubscribeAction } from '../actions/index.js';

describe(`${name}.sagas.eventSubscribe`, () => {
    let web3: Web3; //Web3 loaded from store
    let web3Sender: Web3;
    let accounts: string[];
    let store: StoreType;
    let web3Contract: Web3Contract;

    let address: string;
    let id: ContractId;

    before(async () => {
        const provider = getWeb3Provider();
        //@ts-ignore
        web3 = new Web3(provider);
        //@ts-ignore
        web3Sender = new Web3(provider);
        accounts = await web3.eth.getAccounts();
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
        id = { networkId, address };

        store.dispatch(
            createAction({
                networkId,
                address,
                abi: cloneDeep(BlockNumberArtifact.abi) as AbiItem[],
            }),
        );
    });

    describe('eventSubscribe', () => {
        it('(networkId,address,eventName)', async () => {
            const expectedEvents: any[] = [];
            web3Contract.events['NewValue']().on('data', (event: any) => {
                expectedEvents.push(validatedContractEvent({ networkId, address, name: 'NewValue', ...event }));
            });
            store.dispatch(
                eventSubscribeAction({
                    networkId,
                    address,
                    eventName: 'NewValue',
                }),
            );

            const tx2 = await web3Contract.methods.setValue(42);
            const gas2 = await tx2.estimateGas();
            await tx2.send({ from: accounts[0], gas: gas2, gasPrice: '875000000' });

            const events1 = selectContractEvents(store.getState(), id, 'NewValue');
            assert.deepEqual(events1, expectedEvents);
        });

        it('(...,filter): [event]', async () => {
            const expectedEvents: any[] = [];
            web3Contract.events['NewValue']({ filter: { value: 42 } }).on('data', (event: any) => {
                expectedEvents.push(validatedContractEvent({ networkId, address, name: 'NewValue', ...event }));
            });
            store.dispatch(
                eventSubscribeAction({
                    networkId,
                    address,
                    eventName: 'NewValue',
                    filter: { value: 42 },
                }),
            );

            const tx2 = await web3Contract.methods.setValue(42);
            const gas2 = await tx2.estimateGas();
            await tx2.send({ from: accounts[0], gas: gas2, gasPrice: '875000000' });

            const events1 = selectContractEvents(store.getState(), id, 'NewValue');
            assert.deepEqual(events1, expectedEvents);
        });

        it('(...,filter): []', async () => {
            const expectedEvents: any[] = [];
            store.dispatch(
                eventSubscribeAction({
                    networkId,
                    address,
                    eventName: 'NewValue',
                    filter: { value: 43 },
                }),
            );

            const tx2 = await web3Contract.methods.setValue(42);
            const gas2 = await tx2.estimateGas();
            await tx2.send({ from: accounts[0], gas: gas2, gasPrice: '875000000' });

            //Expect no event to be captured
            const events1 = selectContractEvents(store.getState(), id, 'NewValue');
            assert.deepEqual(events1, expectedEvents);
        });

        it('(...,filter): multiple non-exclusive subscriptions', async () => {
            const expectedEvents: any[] = [];
            web3Contract.events['NewValue']().on('data', (event: any) => {
                expectedEvents.push(validatedContractEvent({ networkId, address, name: 'NewValue', ...event }));
            });
            store.dispatch(
                eventSubscribeAction({
                    networkId,
                    address,
                    eventName: 'NewValue',
                    filter: { value: 42 },
                }),
            );
            //Second event listener
            store.dispatch(
                eventSubscribeAction({
                    networkId,
                    address,
                    eventName: 'NewValue',
                    filter: { value: 43 },
                }),
            );

            const tx2 = await web3Contract.methods.setValue(42);
            const gas2 = await tx2.estimateGas();
            await tx2.send({ from: accounts[0], gas: gas2, gasPrice: '875000000' });

            const tx3 = await web3Contract.methods.setValue(43);
            const gas3 = await tx3.estimateGas();
            await tx3.send({ from: accounts[0], gas: gas3, gasPrice: '875000000' });

            const events1 = selectContractEvents(store.getState(), id, 'NewValue');
            assert.equal(events1?.length, expectedEvents.length, 'expectedEvents.length');
            assert.deepEqual(events1, expectedEvents, 'events value=any');
            const events2 = selectContractEvents(store.getState(), id, 'NewValue', {
                value: '42',
            });
            assert.deepEqual(events2, [expectedEvents[0]], 'events value=42');
            const events3 = selectContractEvents(store.getState(), id, 'NewValue', {
                value: '43',
            });
            assert.deepEqual(events3, [expectedEvents[1]], 'events value=43');
        });
    });
});

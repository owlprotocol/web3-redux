import { assert } from 'chai';
import Web3 from 'web3';
import { Contract as Web3Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import ganache from 'ganache-core';

import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';

import BlockNumberAbi from '../../abis/BlockNumber.json';
import { BlockNumber } from '../../types/web3/BlockNumber';

import { useContractCall, contractCallHookFactory, useEvents, contractEventsHookFactory } from '../../contract/hooks';
import { createStore } from '../../store';
import { Contract, Network } from '../../index';
import { sleep } from '../../test/utils';
import { getId } from '../model';
import { validatedContractEvent } from '../../contractevent/model';

//eslint-disable-next-line @typescript-eslint/no-var-requires
const jsdom = require('mocha-jsdom');

const networkId = '1337';

describe('contract.hooks', () => {
    jsdom({ url: 'http://localhost' });

    let store: ReturnType<typeof createStore>;
    let wrapper: any;

    let web3: Web3; //Web3 loaded from store
    let accounts: string[];
    let web3Contract: Web3Contract;

    let address: string;
    let id: string;

    before(async () => {
        const networkIdInt = parseInt(networkId);
        const provider = ganache.provider({
            networkId: networkIdInt,
        });
        //@ts-ignore
        web3 = new Web3(provider);
        accounts = await web3.eth.getAccounts();
    });

    beforeEach(async () => {
        store = createStore();
        store.dispatch(Network.create({ networkId, web3 }));
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;

        const tx = new web3.eth.Contract(BlockNumberAbi.abi as AbiItem[]).deploy({
            data: BlockNumberAbi.bytecode,
        });
        const gas = await tx.estimateGas();
        web3Contract = await tx.send({ from: accounts[0], gas, gasPrice: '10000' });
        address = web3Contract.options.address;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        id = getId({ networkId, address });

        store.dispatch(
            Contract.create({
                networkId,
                address,
                abi: BlockNumberAbi.abi as AbiItem[],
            }),
        );
    });

    describe('useContractCall', () => {
        it('(networkId, address, method)', async () => {
            const tx2 = await web3Contract.methods.setValue(42);
            const gas2 = await tx2.estimateGas();
            await tx2.send({ from: accounts[0], gas: gas2, gasPrice: '10000' });

            const { result } = renderHook(
                () => useContractCall(networkId, web3Contract.options.address, 'getValue', [], { sync: 'once' }),
                {
                    wrapper,
                },
            );

            await sleep(1000);

            const currentCall = result.current[0];
            const allCalls = result.all.map((x) => (x as any[])[0]);
            assert.equal(currentCall, '42', 'result.current');
            assert.deepEqual(allCalls, [undefined, '42'], 'result.all');
        });
    });

    describe('contractCallHookFactory(method)', () => {
        it('(networkId, address)', async () => {
            const tx2 = await web3Contract.methods.setValue(42);
            const gas2 = await tx2.estimateGas();
            await tx2.send({ from: accounts[0], gas: gas2, gasPrice: '10000' });

            const useGetValue = contractCallHookFactory<BlockNumber, 'getValue'>('getValue');

            const { result } = renderHook(
                () => useGetValue(networkId, web3Contract.options.address, [], { sync: 'once' }),
                {
                    wrapper,
                },
            );

            await sleep(1000);

            const currentCall = result.current[0];
            const allCalls = result.all.map((x) => (x as any[])[0]);
            assert.equal(currentCall, '42', 'result.current');
            assert.deepEqual(allCalls, [undefined, '42'], 'result.all');
        });
    });

    describe('useEvents', () => {
        it('(networkId, address, eventName)', async () => {
            const expectedEvents: any[] = [];
            web3Contract.events['NewValue']().on('data', (event: any) => {
                expectedEvents.push(validatedContractEvent({ networkId, address, name: 'NewValue', ...event }));
            });

            const { result } = renderHook(
                () => useEvents(networkId, web3Contract.options.address, 'NewValue', undefined, { sync: true }),
                {
                    wrapper,
                },
            );

            const tx2 = await web3Contract.methods.setValue(42);
            const gas2 = await tx2.estimateGas();
            await tx2.send({ from: accounts[0], gas: gas2, gasPrice: '10000' });

            await sleep(1000);

            const currentEvents = result.current[0];
            const allEvents = result.all.map((x) => (x as any[])[0]);
            assert.deepEqual(currentEvents, expectedEvents, 'result.current');
            assert.deepEqual(allEvents, [[], expectedEvents], 'result.all');
        });

        it('(...,filter)', async () => {
            const expectedEvents: any[] = [];
            web3Contract.events['NewValue']({ filter: { value: 42 } }).on('data', (event: any) => {
                expectedEvents.push(validatedContractEvent({ networkId, address, name: 'NewValue', ...event }));
            });

            const { result } = renderHook(
                () => useEvents(networkId, web3Contract.options.address, 'NewValue', { value: '42' }, { sync: true }),
                {
                    wrapper,
                },
            );

            const tx2 = await web3Contract.methods.setValue(42);
            const gas2 = await tx2.estimateGas();
            await tx2.send({ from: accounts[0], gas: gas2, gasPrice: '10000' });

            const tx3 = await web3Contract.methods.setValue(43);
            const gas3 = await tx3.estimateGas();
            await tx3.send({ from: accounts[0], gas: gas3, gasPrice: '10000' });

            await sleep(1000);

            const currentEvents = result.current[0];
            const allEvents = result.all.map((x) => (x as any[])[0]);
            assert.deepEqual(currentEvents, expectedEvents, 'result.current');
            assert.deepEqual(allEvents, [[], expectedEvents], 'result.all');
        });
    });

    describe('contractEventsHookFactory(eventName)', () => {
        it('(networkId, address)', async () => {
            const expectedEvents: any[] = [];
            web3Contract.events['NewValue']().on('data', (event: any) => {
                expectedEvents.push(validatedContractEvent({ networkId, address, name: 'NewValue', ...event }));
            });

            const useNewValue = contractEventsHookFactory<BlockNumber, 'NewValue'>('NewValue');
            const { result } = renderHook(
                () => useNewValue(networkId, web3Contract.options.address, undefined, { sync: true }),
                {
                    wrapper,
                },
            );

            const tx2 = await web3Contract.methods.setValue(42);
            const gas2 = await tx2.estimateGas();
            await tx2.send({ from: accounts[0], gas: gas2, gasPrice: '10000' });

            await sleep(1000);

            const currentEvents = result.current[0];
            const allEvents = result.all.map((x) => (x as any[])[0]);
            assert.deepEqual(currentEvents, expectedEvents, 'result.current');
            assert.deepEqual(allEvents, [[], expectedEvents], 'result.all');
        });

        it('(...,filter)', async () => {
            const expectedEvents: any[] = [];
            web3Contract.events['NewValue']({ filter: { value: 42 } }).on('data', (event: any) => {
                expectedEvents.push(validatedContractEvent({ networkId, address, name: 'NewValue', ...event }));
            });

            const useNewValue = contractEventsHookFactory<BlockNumber, 'NewValue'>('NewValue');
            const { result } = renderHook(
                () => useNewValue(networkId, web3Contract.options.address, { value: '42' }, { sync: true }),
                {
                    wrapper,
                },
            );

            const tx2 = await web3Contract.methods.setValue(42);
            const gas2 = await tx2.estimateGas();
            await tx2.send({ from: accounts[0], gas: gas2, gasPrice: '10000' });

            const tx3 = await web3Contract.methods.setValue(43);
            const gas3 = await tx3.estimateGas();
            await tx3.send({ from: accounts[0], gas: gas3, gasPrice: '10000' });

            await sleep(1000);

            const currentEvents = result.current[0];
            const allEvents = result.all.map((x) => (x as any[])[0]);
            assert.deepEqual(currentEvents, expectedEvents, 'result.current');
            assert.deepEqual(allEvents, [[], expectedEvents], 'result.all');
        });
    });
});

import { assert } from 'chai';
import Web3 from 'web3';
import { Contract as Web3Contract } from 'web3-eth-contract';
import { renderHook } from '@testing-library/react-hooks';

// eslint-disable-next-line import/no-unresolved
import { BlockNumber } from '../../types/web3/BlockNumber';
import { validate as validatedContractEvent } from '../../contractevent/model/interface';

import { name } from '../common';
import { networkId } from '../../test/data';
import { StoreType } from '../../store';
import { useEvents, contractEventsHookFactory } from '.';
// eslint-disable-next-line import/no-unresolved
import { beforeFn, beforeEachFn, deployBlockNoContract } from './index.test';

//eslint-disable-next-line @typescript-eslint/no-var-requires
const jsdom = require('mocha-jsdom');

describe(`${name}.hooks.useEvents`, () => {
    jsdom({ url: 'http://localhost' });

    let store: StoreType;
    let wrapper: any;

    let web3: Web3; //Web3 loaded from store
    let accounts: string[];
    let web3Contract: Web3Contract;
    let address: string;

    before(async () => {
        ({ web3, accounts } = await beforeFn());
    });

    beforeEach(async () => {
        ({ store, wrapper } = beforeEachFn({ web3 }));
        ({ address, web3Contract } = await deployBlockNoContract({ web3, store, from: accounts[0] }));
    });

    describe('useEvents', () => {
        it('(networkId, address, eventName)', async () => {
            const expectedEvents: any[] = [];
            web3Contract.events['NewValue']().on('data', (event: any) => {
                expectedEvents.push(validatedContractEvent({ networkId, address, name: 'NewValue', ...event }));
            });

            const { result, waitForNextUpdate } = renderHook(
                () => useEvents(networkId, web3Contract.options.address, 'NewValue', undefined, { sync: true }),
                {
                    wrapper,
                },
            );

            const tx2 = await web3Contract.methods.setValue(42);
            const gas2 = await tx2.estimateGas();
            tx2.send({ from: accounts[0], gas: gas2, gasPrice: '10000' });
            await waitForNextUpdate();

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

            const { result, waitForNextUpdate } = renderHook(
                () => useEvents(networkId, web3Contract.options.address, 'NewValue', { value: '42' }, { sync: true }),
                {
                    wrapper,
                },
            );

            const tx2 = await web3Contract.methods.setValue(42);
            const gas2 = await tx2.estimateGas();
            tx2.send({ from: accounts[0], gas: gas2, gasPrice: '10000' });
            await waitForNextUpdate();

            const tx3 = await web3Contract.methods.setValue(43);
            const gas3 = await tx3.estimateGas();
            await tx3.send({ from: accounts[0], gas: gas3, gasPrice: '10000' });

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
            const { result, waitForNextUpdate } = renderHook(
                () => useNewValue(networkId, web3Contract.options.address, undefined, { sync: true }),
                {
                    wrapper,
                },
            );

            const tx2 = await web3Contract.methods.setValue(42);
            const gas2 = await tx2.estimateGas();
            tx2.send({ from: accounts[0], gas: gas2, gasPrice: '10000' });
            await waitForNextUpdate();

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
            const { result, waitForNextUpdate } = renderHook(
                () => useNewValue(networkId, web3Contract.options.address, { value: '42' }, { sync: true }),
                {
                    wrapper,
                },
            );

            const tx2 = await web3Contract.methods.setValue(42);
            const gas2 = await tx2.estimateGas();
            tx2.send({ from: accounts[0], gas: gas2, gasPrice: '10000' });
            await waitForNextUpdate();

            const tx3 = await web3Contract.methods.setValue(43);
            const gas3 = await tx3.estimateGas();
            await tx3.send({ from: accounts[0], gas: gas3, gasPrice: '10000' });

            const currentEvents = result.current[0];
            const allEvents = result.all.map((x) => (x as any[])[0]);
            assert.deepEqual(currentEvents, expectedEvents, 'result.current');
            assert.deepEqual(allEvents, [[], expectedEvents], 'result.all');
        });
    });
});

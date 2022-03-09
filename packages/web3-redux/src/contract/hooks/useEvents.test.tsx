import { assert } from 'chai';
import { Provider } from 'react-redux';
import Web3 from 'web3';
import { Contract as Web3Contract } from 'web3-eth-contract';
import { renderHook } from '@testing-library/react-hooks';
import { cloneDeep } from 'lodash';
import { getWeb3Provider } from '../../test';

import BlockNumberArtifact from '../../abis/BlockNumber.json';

import { create as createNetwork } from '../../network/actions';
import { validateContractEvent } from '../../contractevent';

import { name } from '../common';
import { networkId } from '../../test/data';
import { createStore, StoreType } from '../../store';
import { create } from '../actions';

import useEvents from '../hooks/useEvents';

//eslint-disable-next-line @typescript-eslint/no-var-requires
const jsdom = require('mocha-jsdom');

describe(`${name}/hooks/useEvents.tsx`, () => {
    jsdom({ url: 'http://localhost' });

    let store: StoreType;
    let wrapper: any;

    let web3: Web3; //Web3 loaded from store
    let accounts: string[];
    let web3Contract: Web3Contract;
    let address: string;

    before(async () => {
        const provider = getWeb3Provider();
        //@ts-ignore
        web3 = new Web3(provider);
        accounts = await web3.eth.getAccounts();
    });

    beforeEach(async () => {
        web3Contract = await new web3.eth.Contract(cloneDeep(BlockNumberArtifact.abi) as any)
            .deploy({
                data: BlockNumberArtifact.bytecode,
            })
            .send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
        address = web3Contract.options.address;

        ({ store } = createStore());
        store.dispatch(createNetwork({ networkId, web3 }));
        store.dispatch(
            create({
                networkId,
                address,
                abi: cloneDeep(BlockNumberArtifact.abi) as any,
            }),
        );
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    describe('useEvents', () => {
        it('(networkId, address, eventName)', async () => {
            const expectedEvents: any[] = [];
            web3Contract.events['NewValue']().on('data', (event: any) => {
                expectedEvents.push(validateContractEvent({ networkId, address, name: 'NewValue', ...event }));
            });

            const { result, waitForNextUpdate } = renderHook(
                () => useEvents(networkId, address, 'NewValue', undefined, { sync: true }),
                {
                    wrapper,
                },
            );

            web3Contract.methods.setValue(42).send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
            await waitForNextUpdate();

            const currentEvents = result.current;
            const allEvents = result.all;
            assert.deepEqual(currentEvents, expectedEvents, 'result.current');
            assert.deepEqual(allEvents, [[], expectedEvents], 'result.all');
        });

        it('(...,filter)', async () => {
            const expectedEvents: any[] = [];
            web3Contract.events['NewValue']({ filter: { value: 42 } }).on('data', (event: any) => {
                expectedEvents.push(validateContractEvent({ networkId, address, name: 'NewValue', ...event }));
            });

            const { result, waitForNextUpdate } = renderHook(
                () => useEvents(networkId, address, 'NewValue', { value: '42' }, { sync: true }),
                {
                    wrapper,
                },
            );

            web3Contract.methods.setValue(42).send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
            await waitForNextUpdate();

            //This is ignored by the hook
            await web3Contract.methods.setValue(43).send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });

            const currentEvents = result.current;
            const allEvents = result.all;
            assert.deepEqual(currentEvents, expectedEvents, 'result.current');
            assert.deepEqual(allEvents, [[], expectedEvents], 'result.all');
        });
    });
});

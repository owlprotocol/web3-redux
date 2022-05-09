import { assert } from 'chai';
import { Provider } from 'react-redux';
import Web3 from 'web3';
import type { Contract as Web3Contract } from 'web3-eth-contract';
import { renderHook } from '@testing-library/react-hooks';
import jsdom from 'mocha-jsdom';
import { cloneDeep } from '../../utils/lodash/index.js';
import { getWeb3Provider, expectThrowsAsync } from '../../test/index.js';
import { BlockNumber as BlockNumberArtifact } from '../../abis/index.js';

import { create as createNetwork } from '../../network/actions/index.js';
import { create as createTransaction } from '../../transaction/actions/index.js';
import { create as createBlock } from '../../block/actions/index.js';
import { create as createEvent } from '../../contractevent/actions/index.js';

import { name } from '../common.js';
import { networkId } from '../../test/data.js';
import { createStore, StoreType } from '../../store.js';
import { create } from '../actions/index.js';

import { useContractCall } from '../hooks/useContractCall.js';
import { createEventSync } from '../../sync/model/EventSync.js';

describe(`${name}/hooks/useContractCall.test.tsx`, () => {
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

    describe('useContractCall', () => {
        it('(networkId, address, method, [], { sync: once })', async () => {
            const { result, waitForNextUpdate } = renderHook(
                () => useContractCall(networkId, address, 'getValue', [], { sync: 'once' }),
                {
                    wrapper,
                },
            );

            await waitForNextUpdate();

            const currentCall = result.current;
            assert.equal(currentCall, '0', 'result.current');
            const allCalls = result.all;
            assert.deepEqual(allCalls, [undefined, '0'], 'result.all');
            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });

        it('(networkId, address, method, [], { sync: false })', async () => {
            const { result, waitForNextUpdate } = renderHook(
                () => useContractCall(networkId, address, 'getValue', [], { sync: false }),
                {
                    wrapper,
                },
            );

            const currentCall = result.current;
            assert.isUndefined(currentCall, 'result.current');
            const allCalls = result.all;
            assert.deepEqual(allCalls, [undefined], 'result.all');
            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });

        it('(networkId, address, method, [], { sync: ifnull })', async () => {
            const { result, waitForNextUpdate } = renderHook(
                () => useContractCall(networkId, address, 'getValue', [], { sync: 'ifnull' }),
                {
                    wrapper,
                },
            );

            await waitForNextUpdate();

            const currentCall = result.current;
            assert.equal(currentCall, '0', 'result.current');
            const allCalls = result.all;
            assert.deepEqual(allCalls, [undefined, '0'], 'result.all');
            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });

        it('(networkId, address, method, [], { sync: Transaction })', async () => {
            const { result, waitForNextUpdate } = renderHook(
                () => useContractCall(networkId, address, 'getValue', [], { sync: 'Transaction' }),
                {
                    wrapper,
                },
            );

            await waitForNextUpdate();
            await web3Contract.methods.setValue(42).send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
            //Create transaction, triggering a refresh
            store.dispatch(
                createTransaction({
                    networkId,
                    hash: '0x1',
                    from: accounts[0],
                    to: address,
                }),
            );
            await waitForNextUpdate();

            const currentCall = result.current;
            assert.equal(currentCall, '42', 'result.current');
            const allCalls = result.all;
            assert.deepEqual(allCalls, [undefined, '0', '42'], 'result.all');
            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });

        it('(networkId, address, method, [], { sync: Block })', async () => {
            const { result, waitForNextUpdate } = renderHook(
                () => useContractCall(networkId, address, 'getValue', [], { sync: 'Block' }),
                {
                    wrapper,
                },
            );

            await waitForNextUpdate();
            await web3Contract.methods.setValue(42).send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
            //Create block, triggering a refresh
            store.dispatch(
                createBlock({
                    networkId,
                    number: 1,
                }),
            );
            await waitForNextUpdate();

            const currentCall = result.current;
            assert.equal(currentCall, '42', 'result.current');
            const allCalls = result.all;
            assert.deepEqual(allCalls, [undefined, '0', '42'], 'result.all');
            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });

        it('(networkId, address, method, [], { sync: Event })', async () => {
            //Matches all NewValue updates
            const eventSync = createEventSync(networkId, [], address, 'NewValue', {});
            const { result, waitForNextUpdate } = renderHook(
                () => useContractCall(networkId, address, 'getValue', [], { sync: eventSync }),
                {
                    wrapper,
                },
            );

            await waitForNextUpdate();
            await web3Contract.methods.setValue(42).send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
            //Create event, triggering a refresh
            store.dispatch(
                createEvent({
                    networkId,
                    address,
                    blockHash: '0x1',
                    logIndex: 0,
                    name: 'NewValue',
                    returnValues: {},
                }),
            );
            await waitForNextUpdate();

            const currentCall = result.current;
            assert.equal(currentCall, '42', 'result.current');
            const allCalls = result.all;
            assert.deepEqual(allCalls, [undefined, '0', '42'], 'result.all');
            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
    });
});

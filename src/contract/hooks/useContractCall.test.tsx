import { assert } from 'chai';
import { Provider } from 'react-redux';
import Ganache from 'ganache-core';
import Web3 from 'web3';
import { Contract as Web3Contract } from 'web3-eth-contract';
import { renderHook } from '@testing-library/react-hooks';
import BlockNumber from '../../abis/BlockNumber.json';

import { create as createNetwork } from '../../network/actions';

import { name } from '../common';
import { networkId } from '../../test/data';
import { createStore, StoreType } from '../../store';
import { create } from '../actions';
import { fetch as fetchTransaction } from '../../transaction/actions';
import { fetch as fetchBlock } from '../../block/actions';

import useContractCall from '../hooks/useContractCall';

//eslint-disable-next-line @typescript-eslint/no-var-requires
const jsdom = require('mocha-jsdom');

describe(`${name}/hooks/useContractCall.test.tsx`, () => {
    jsdom({ url: 'http://localhost' });

    let store: StoreType;
    let wrapper: any;

    let web3: Web3; //Web3 loaded from store
    let accounts: string[];
    let web3Contract: Web3Contract;
    let address: string;

    before(async () => {
        const provider = Ganache.provider({
            networkId: parseInt(networkId),
        });
        //@ts-ignore
        web3 = new Web3(provider);

        accounts = await web3.eth.getAccounts();
    });

    beforeEach(async () => {
        web3Contract = await new web3.eth.Contract(BlockNumber.abi as any)
            .deploy({
                data: BlockNumber.bytecode,
            })
            .send({ from: accounts[0], gas: 1000000, gasPrice: '10000' });
        address = web3Contract.options.address;

        ({ store } = createStore());
        store.dispatch(createNetwork({ networkId, web3 }));
        store.dispatch(
            create({
                networkId,
                address,
                abi: BlockNumber.abi as any,
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

            const currentCall = result.current[0];
            assert.equal(currentCall, '0', 'result.current');
            const allCalls = result.all.map((x) => (x as any[])[0]);
            assert.deepEqual(allCalls, [undefined, '0'], 'result.all');
        });

        it('(networkId, address, method, [], { sync: false })', async () => {
            const { result } = renderHook(() => useContractCall(networkId, address, 'getValue', [], { sync: false }), {
                wrapper,
            });

            const currentCall = result.current[0];
            assert.isUndefined(currentCall, 'result.current');
            const allCalls = result.all.map((x) => (x as any[])[0]);
            assert.deepEqual(allCalls, [undefined], 'result.all');
        });

        it('(networkId, address, method, [], { sync: ifnull })', async () => {
            const { result, waitForNextUpdate } = renderHook(
                () => useContractCall(networkId, address, 'getValue', [], { sync: 'ifnull' }),
                {
                    wrapper,
                },
            );

            await waitForNextUpdate();

            const currentCall = result.current[0];
            assert.equal(currentCall, '0', 'result.current');
            const allCalls = result.all.map((x) => (x as any[])[0]);
            assert.deepEqual(allCalls, [undefined, '0'], 'result.all');
        });

        it('(networkId, address, method, [], { sync: Transaction })', async () => {
            const { result, waitForNextUpdate } = renderHook(
                () => useContractCall(networkId, address, 'getValue', [], { sync: 'Transaction' }),
                {
                    wrapper,
                },
            );

            await waitForNextUpdate();
            const receipt = await web3Contract.methods
                .setValue(42)
                .send({ from: accounts[0], gas: 1000000, gasPrice: '1' });
            //Fetch transaction, triggering a refresh
            store.dispatch(
                fetchTransaction({
                    networkId,
                    hash: receipt.transactionHash,
                }),
            );
            await waitForNextUpdate();

            const currentCall = result.current[0];
            assert.equal(currentCall, '42', 'result.current');
            const allCalls = result.all.map((x) => (x as any[])[0]);
            assert.deepEqual(allCalls, [undefined, '0', '42'], 'result.all');
        });

        it('(networkId, address, method, [], { sync: Block })', async () => {
            const { result, waitForNextUpdate } = renderHook(
                () => useContractCall(networkId, address, 'getValue', [], { sync: 'Block' }),
                {
                    wrapper,
                },
            );

            await waitForNextUpdate();
            const receipt = await web3Contract.methods
                .setValue(42)
                .send({ from: accounts[0], gas: 1000000, gasPrice: '1' });
            //Fetch transaction, triggering a refresh
            store.dispatch(
                fetchBlock({
                    networkId,
                    blockHashOrBlockNumber: receipt.blockHash,
                }),
            );
            await waitForNextUpdate();

            const currentCall = result.current[0];
            assert.equal(currentCall, '42', 'result.current');
            const allCalls = result.all.map((x) => (x as any[])[0]);
            assert.deepEqual(allCalls, [undefined, '0', '42'], 'result.all');
        });
    });
});

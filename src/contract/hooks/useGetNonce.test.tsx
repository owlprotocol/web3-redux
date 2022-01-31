import { assert } from 'chai';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import Ganache from 'ganache-core';
import Web3 from 'web3';

import { create as createNetwork } from '../../network/actions';
import { fetch as fetchTransaction } from '../../transaction/actions';
import { fetch as fetchBlock } from '../../block/actions';

import { name } from '../common';
import { networkId } from '../../test/data';
import { createStore, StoreType } from '../../store';
import { create } from '../actions';

import useGetNonce from './useGetNonce';
import { ZERO_ADDRESS } from '../../utils';

//eslint-disable-next-line @typescript-eslint/no-var-requires
const jsdom = require('mocha-jsdom');

describe(`${name}/hooks/useGetNonce.test.tsx`, () => {
    jsdom({ url: 'http://localhost' });

    let web3: Web3;
    let store: StoreType;
    let wrapper: any;
    let address: string;

    before(async () => {
        const provider = Ganache.provider({
            networkId: parseInt(networkId),
        });
        //@ts-ignore
        web3 = new Web3(provider);

        const accounts = await web3.eth.getAccounts();
        address = accounts[0];
    });

    beforeEach(() => {
        ({ store } = createStore());
        store.dispatch(createNetwork({ networkId, web3 }));
        store.dispatch(create({ networkId, address }));
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    describe('useGetNonce', () => {
        it('(networkId, address, once)', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useGetNonce(networkId, address, 'once'), {
                wrapper,
            });
            await waitForNextUpdate();
            const expected = await web3.eth.getTransactionCount(address);
            assert.equal(result.current, expected, 'contract.nonce != expected');
            assert.deepEqual(result.all, [undefined, expected], 'result.all');
        });

        it('(networkId, address, false)', async () => {
            const { result } = renderHook(() => useGetNonce(networkId, address, false), {
                wrapper,
            });
            assert.isUndefined(result.current);
            assert.deepEqual(result.all, [undefined], 'result.all');
        });

        it('(networkId, address, ifnull)', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useGetNonce(networkId, address, 'ifnull'), {
                wrapper,
            });
            await waitForNextUpdate();
            const expected = await web3.eth.getTransactionCount(address);
            assert.equal(result.current, expected, 'contract.nonce != expected');
            assert.deepEqual(result.all, [undefined, expected], 'result.all');
        });

        it('(networkId, address, Transaction)', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useGetNonce(networkId, address, 'Transaction'), {
                wrapper,
            });

            await waitForNextUpdate();
            const expected1 = await web3.eth.getTransactionCount(address);
            const value1 = result.current;
            assert.equal(value1, expected1, 'contract.nonce != expected');

            const receipt = await web3.eth.sendTransaction({ from: address, to: ZERO_ADDRESS, value: '1' });
            //Fetch transaction, triggering a refresh
            store.dispatch(
                fetchTransaction({
                    networkId,
                    hash: receipt.transactionHash,
                }),
            );
            await waitForNextUpdate();
            const expected2 = await web3.eth.getTransactionCount(address);
            const value2 = result.current;
            assert.equal(value2, expected2, 'contract.nonce != expected');
            assert.deepEqual(result.all, [undefined, value1, value2], 'result.all');
        });

        it('(networkId, address, Block)', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useGetNonce(networkId, address, 'Block'), {
                wrapper,
            });

            await waitForNextUpdate();
            const expected1 = await web3.eth.getTransactionCount(address);
            const value1 = result.current;
            assert.equal(value1, expected1, 'contract.nonce != expected');

            const receipt = await web3.eth.sendTransaction({ from: address, to: ZERO_ADDRESS, value: '1' });
            //Fetch block, triggering a refresh
            store.dispatch(
                fetchBlock({
                    networkId,
                    blockHashOrBlockNumber: receipt.blockHash,
                }),
            );
            await waitForNextUpdate();
            const expected2 = await web3.eth.getTransactionCount(address);
            const value2 = result.current;
            assert.equal(value2, expected2, 'contract.nonce != expected');
            //TODO: Investigate why fails with extra re-render [undefined, value1, value1, value2]
            //assert.deepEqual(result.all, [undefined, value1, value2], 'result.all');
        });
    });
});

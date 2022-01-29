import { assert } from 'chai';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import Ganache from 'ganache-core';
import Web3 from 'web3';

import { fetch as fetchTransaction } from '../../transaction/actions';
import { fetch as fetchBlock } from '../../block/actions';
import { create as createNetwork } from '../../network/actions';

import { name } from '../common';
import { networkId } from '../../test/data';
import { createStore, StoreType } from '../../store';
import { create } from '../actions';
import Contract from '../model/interface';
import { sleep, ZERO_ADDRESS } from '../../utils';

import use from './useAccount';

//eslint-disable-next-line @typescript-eslint/no-var-requires
const jsdom = require('mocha-jsdom');

describe(`${name}.hooks`, () => {
    jsdom({ url: 'http://localhost' });

    let store: StoreType;
    let web3: Web3;
    let item: Contract;

    let wrapper: any;
    before(async () => {
        const provider = Ganache.provider({
            networkId: parseInt(networkId),
        });
        //@ts-ignore
        web3 = new Web3(provider);

        const accounts = await web3.eth.getAccounts();
        item = { networkId, address: accounts[0] };
    });

    beforeEach(() => {
        store = createStore();
        store.dispatch(createNetwork({ networkId, web3 }));
        store.dispatch(create(item));
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    describe('use', () => {
        describe('sync:once', () => {
            it('(networkId, address, sync: {balance: once})', async () => {
                const { result } = renderHook(() => use(networkId, item.address, { balance: 'once' }), {
                    wrapper,
                });
                await sleep(100);
                const expected = await web3.eth.getBalance(item.address);
                assert.equal(result.current?.balance, expected, 'result.current.balance');
            });

            it('(networkId, address, sync: {nonce: once})', async () => {
                const { result } = renderHook(() => use(networkId, item.address, { nonce: 'once' }), {
                    wrapper,
                });
                await sleep(100);
                const expected = await web3.eth.getTransactionCount(item.address);
                assert.equal(result.current?.nonce, expected, 'result.current.nonce');
            });

            it('(networkId, address, sync: {getCode: once})', async () => {
                const { result } = renderHook(() => use(networkId, item.address, { getCode: 'once' }), {
                    wrapper,
                });
                await sleep(100);
                assert.equal(result.current?.code, '0x', 'result.current.code');
            });
        });

        describe('sync:Transaction', () => {
            it('(networkId, address, sync: {balance: Transaction})', async () => {
                const { result } = renderHook(() => use(networkId, item.address, { balance: 'Transaction' }), {
                    wrapper,
                });

                const receipt = await web3.eth.sendTransaction({ from: item.address, to: ZERO_ADDRESS, value: '1' });
                //Fetch transaction, triggering a refresh
                store.dispatch(
                    fetchTransaction({
                        networkId,
                        hash: receipt.transactionHash,
                    }),
                );

                const expected = await web3.eth.getBalance(item.address!);
                await sleep(100);
                assert.equal(result.current?.balance, expected, 'result.current.balance');
            });

            it('(networkId, address, sync: {nonce: Transaction})', async () => {
                const { result } = renderHook(() => use(networkId, item.address, { nonce: 'Transaction' }), {
                    wrapper,
                });

                const receipt = await web3.eth.sendTransaction({ from: item.address, to: ZERO_ADDRESS, value: '1' });
                //Fetch transaction, triggering a refresh
                store.dispatch(
                    fetchTransaction({
                        networkId,
                        hash: receipt.transactionHash,
                    }),
                );

                const expected = await web3.eth.getTransactionCount(item.address!);
                await sleep(100);
                assert.equal(result.current?.nonce, expected, 'result.current.nonce');
            });
        });

        describe('sync:Block', () => {
            it('(networkId, address, sync: {balance: Block})', async () => {
                const { result } = renderHook(() => use(networkId, item.address, { balance: 'Block' }), {
                    wrapper,
                });

                const receipt = await web3.eth.sendTransaction({ from: item.address, to: ZERO_ADDRESS, value: '1' });
                //Fetch block, triggering a refresh
                store.dispatch(
                    fetchBlock({
                        networkId,
                        blockHashOrBlockNumber: receipt.blockHash,
                    }),
                );

                const expected = await web3.eth.getBalance(item.address!);
                await sleep(100);
                assert.equal(result.current?.balance, expected, 'result.current.balance');
            });

            it('(networkId, address, sync: {nonce: Block})', async () => {
                const { result } = renderHook(() => use(networkId, item.address, { nonce: 'Block' }), {
                    wrapper,
                });

                const receipt = await web3.eth.sendTransaction({ from: item.address, to: ZERO_ADDRESS, value: '1' });
                //Fetch block, triggering a refresh
                store.dispatch(
                    fetchBlock({
                        networkId,
                        blockHashOrBlockNumber: receipt.blockHash,
                    }),
                );

                const expected = await web3.eth.getTransactionCount(item.address!);
                await sleep(100);
                assert.equal(result.current?.nonce, expected, 'result.current.nonce');
            });
        });
    });
});

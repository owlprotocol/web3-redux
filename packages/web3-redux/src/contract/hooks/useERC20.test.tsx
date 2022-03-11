import { assert } from 'chai';
// eslint-disable-next-line prettier/prettier
import { Provider } from 'react-redux';
import Web3 from 'web3';
import { Contract as Web3Contract } from 'web3-eth-contract';
import { renderHook } from '@testing-library/react-hooks';
import { useERC20 } from './useERC20.js';
import { getWeb3Provider, expectThrowsAsync } from '../../test/index.js';

import { ERC20PresetMinterPauser } from '../../abis/index.js';

import { create as createNetwork } from '../../network/actions/index.js';
import { create as createTransaction } from '../../transaction/actions/index.js';
import { create as createBlock } from '../../block/actions/index.js';
import { create as createEvent } from '../../contractevent/actions/index.js';

import { name } from '../common.js';
import { ADDRESS_0, networkId } from '../../test/data.js';
import { createStore, StoreType } from '../../store.js';

//eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-commonjs
const jsdom = require('mocha-jsdom');

describe(`${name}/hooks/useERC20.test.tsx`, () => {
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
        web3Contract = await new web3.eth.Contract(ERC20PresetMinterPauser.abi as any)
            .deploy({
                arguments: ['Test Token', 'TEST'],
                data: ERC20PresetMinterPauser.bytecode,
            })
            .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });
        address = web3Contract.options.address;

        await web3Contract.methods
            .mint(accounts[0], 1)
            .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });

        ({ store } = createStore());
        store.dispatch(createNetwork({ networkId, web3 }));
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    describe('useERC20()', async () => {
        it('default', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useERC20(networkId, address, accounts[0]), {
                wrapper,
            });

            //Two synchronous renders for useContractWithAbi
            assert.equal(result.all.length, 2, 'result.all.length');
            await waitForNextUpdate(); //name
            await waitForNextUpdate(); //symbol
            await waitForNextUpdate(); //decimals
            await waitForNextUpdate(); //totalSupply
            await waitForNextUpdate(); //balanceOf
            assert.equal(result.all.length, 7, 'result.all.length');

            const value = result.current;
            assert.equal(value.name, 'Test Token', 'name');
            assert.equal(value.symbol, 'TEST', 'symbol');
            assert.equal(value.decimals, 18, 'decimals');
            assert.equal(value.totalSupply, 1, 'totalSupply');
            assert.equal(value.balanceOf, 1, 'balanceOf');

            assert.deepEqual(value.TransferFrom, [], 'TransferFrom');
            assert.deepEqual(value.TransferTo, [], 'TransferTo');
            assert.deepEqual(value.ApprovalOwner, [], 'ApprovalOwner');
            assert.deepEqual(value.ApprovalSpender, [], 'ApprovalSpender');

            assert.equal(result.all.length, 7, 'result.all.length');
            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });

        describe('Transfer', () => {
            //Sync new transfer events
            it('sync', async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () => useERC20(networkId, address, accounts[0], { TransferEventsOptions: { sync: true } }),
                    {
                        wrapper,
                    },
                );

                //Two synchronous renders for useContractWithAbi
                assert.equal(result.all.length, 2, 'result.all.length');
                await waitForNextUpdate(); //name
                await waitForNextUpdate(); //symbol
                await waitForNextUpdate(); //decimals
                await waitForNextUpdate(); //totalSupply
                await waitForNextUpdate(); //balanceOf
                assert.equal(result.all.length, 7, 'result.all.length');

                //Mint function emits Transfer event with to = <accounts[0]>
                web3Contract.methods
                    .mint(accounts[0], 1)
                    .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });
                await waitForNextUpdate(); //update events

                const value = result.current;
                assert.equal(value.TransferFrom!.length, 0, 'TransferFrom');
                assert.equal(value.TransferTo!.length, 1, 'TransferTo');

                assert.equal(result.all.length, 8, 'result.all.length');
                //No additional re-renders frm background tasks
                await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
            });
            //Get past Transfer events
            it('past', async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () => useERC20(networkId, address, accounts[0], { TransferEventsOptions: { past: true } }),
                    {
                        wrapper,
                    },
                );

                //Two synchronous renders for useContractWithAbi
                assert.equal(result.all.length, 2, 'result.all.length');
                await waitForNextUpdate(); //name
                await waitForNextUpdate(); //symbol
                await waitForNextUpdate(); //decimals
                await waitForNextUpdate(); //totalSupply
                await waitForNextUpdate(); //balanceOf
                assert.equal(result.all.length, 7, 'result.all.length');
                await waitForNextUpdate(); //past Transfer events

                const value = result.current;
                assert.equal(value.TransferFrom!.length, 0, 'TransferFrom');
                assert.equal(value.TransferTo!.length, 1, 'TransferTo');

                assert.equal(result.all.length, 8, 'result.all.length');
                //No additional re-renders frm background tasks
                await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
            });
        });
        describe('balancOf', () => {
            it('Transaction', async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () => useERC20(networkId, address, accounts[0], { balanceOf: 'Transaction' }),
                    {
                        wrapper,
                    },
                );

                //Two synchronous renders for useContractWithAbi
                assert.equal(result.all.length, 2, 'result.all.length');
                await waitForNextUpdate(); //name
                await waitForNextUpdate(); //symbol
                await waitForNextUpdate(); //decimals
                await waitForNextUpdate(); //totalSupply
                await waitForNextUpdate(); //balanceOf
                assert.equal(result.all.length, 7, 'result.all.length');

                await web3Contract.methods
                    .mint(accounts[0], 1)
                    .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });
                //Create transaction, triggering a refresh
                store.dispatch(
                    createTransaction({
                        networkId,
                        hash: '0x1',
                        from: accounts[0],
                        to: address,
                    }),
                );

                await waitForNextUpdate(); //balanceOf gets updated by detecting new transaction

                const value = result.current;
                assert.equal(value.balanceOf, 2, 'balanceOf'); //updated balance

                assert.equal(result.all.length, 8, 'result.all.length');
                //No additional re-renders frm background tasks
                await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
            });
            it('Block', async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () => useERC20(networkId, address, accounts[0], { balanceOf: 'Block' }),
                    {
                        wrapper,
                    },
                );

                //Two synchronous renders for useContractWithAbi
                assert.equal(result.all.length, 2, 'result.all.length');
                await waitForNextUpdate(); //name
                await waitForNextUpdate(); //symbol
                await waitForNextUpdate(); //decimals
                await waitForNextUpdate(); //totalSupply
                await waitForNextUpdate(); //balanceOf
                assert.equal(result.all.length, 7, 'result.all.length');

                await web3Contract.methods
                    .mint(accounts[0], 1)
                    .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });
                //Create block, triggering a refresh
                store.dispatch(
                    createBlock({
                        networkId,
                        number: 1,
                    }),
                );
                await waitForNextUpdate();

                const value = result.current;
                assert.equal(value.balanceOf, 2, 'balanceOf'); //updated balance
                assert.equal(result.all.length, 8, 'result.all.length');
                //No additional re-renders frm background tasks
                await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
            });
            it('onTransfer', async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () => useERC20(networkId, address, accounts[0], { balanceOf: 'onTransfer' }),
                    {
                        wrapper,
                    },
                );

                //Two synchronous renders for useContractWithAbi
                assert.equal(result.all.length, 2, 'result.all.length');
                await waitForNextUpdate(); //name
                await waitForNextUpdate(); //symbol
                await waitForNextUpdate(); //decimals
                await waitForNextUpdate(); //totalSupply
                await waitForNextUpdate(); //balanceOf
                assert.equal(result.all.length, 7, 'result.all.length');

                await web3Contract.methods
                    .mint(accounts[0], 1)
                    .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });
                //Create event, triggering a refresh
                store.dispatch(
                    createEvent({
                        networkId,
                        address,
                        blockHash: '0x1',
                        logIndex: 0,
                        name: 'Transfer',
                        returnValues: { from: ADDRESS_0, to: accounts[0], amount: 1 },
                    }),
                );
                //Synchronous update to TransferTo events
                assert.equal(result.all.length, 8, 'result.all.length');
                await waitForNextUpdate();

                const value = result.current;
                assert.equal(value.balanceOf, 2, 'balanceOf'); //updated balance
                assert.equal(result.all.length, 9, 'result.all.length');
                //No additional re-renders frm background tasks
                await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
            });
        });
    });
});
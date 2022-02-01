import { assert } from 'chai';
import { Provider } from 'react-redux';
import Ganache from 'ganache-core';
import Web3 from 'web3';
import { Contract as Web3Contract } from 'web3-eth-contract';
import { renderHook } from '@testing-library/react-hooks';
import ERC20 from '../../abis/ERC20PresetMinterPauser.json';

import { create as createNetwork } from '../../network/actions';
import { fetch as fetchTransaction } from '../../transaction/actions';
import { create as createEvent } from '../../contractevent/actions';

import { name } from '../common';
import { networkId } from '../../test/data';
import { createStore, StoreType } from '../../store';

import useERC20 from './useERC20';
import { createEventSync } from '../../sync/model/EventSync';

//eslint-disable-next-line @typescript-eslint/no-var-requires
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
        const provider = Ganache.provider({
            networkId: parseInt(networkId),
        });
        //@ts-ignore
        web3 = new Web3(provider);

        accounts = await web3.eth.getAccounts();
    });

    beforeEach(async () => {
        web3Contract = await new web3.eth.Contract(ERC20.abi as any)
            .deploy({
                arguments: ['Test Token', 'TEST'],
                data: ERC20.bytecode,
            })
            .send({ from: accounts[0], gas: 2000000, gasPrice: '1' });
        address = web3Contract.options.address;

        await web3Contract.methods.mint(accounts[0], 1).send({ from: accounts[0], gas: 2000000, gasPrice: '1' });

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
            await waitForNextUpdate(); //name
            await waitForNextUpdate(); //symbol
            await waitForNextUpdate(); //decimals
            await waitForNextUpdate(); //totalSupply
            await waitForNextUpdate(); //balanceOf

            assert.equal(result.all.length, 7, 'result.all.length != 7');

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
                await waitForNextUpdate(); //name
                await waitForNextUpdate(); //symbol
                await waitForNextUpdate(); //decimals
                await waitForNextUpdate(); //totalSupply
                await waitForNextUpdate(); //balanceOf

                assert.equal(result.all.length, 7, 'result.all.length != 7');

                //Mint function emits Transfer event with to = <accounts[0]>
                await web3Contract.methods
                    .mint(accounts[0], 1)
                    .send({ from: accounts[0], gas: 2000000, gasPrice: '1' });

                await waitForNextUpdate(); //update events

                const value = result.current;
                assert.equal(value.TransferFrom!.length, 0, 'TransferFrom');
                assert.equal(value.TransferTo!.length, 1, 'TransferTo');
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
                await waitForNextUpdate(); //name
                await waitForNextUpdate(); //symbol
                await waitForNextUpdate(); //decimals
                await waitForNextUpdate(); //totalSupply
                await waitForNextUpdate(); //balanceOf

                await waitForNextUpdate(); //past Transfer events

                const value = result.current;
                assert.equal(value.TransferFrom!.length, 0, 'TransferFrom');
                assert.equal(value.TransferTo!.length, 1, 'TransferTo');
            });
        });
        describe('balancOf', () => {
            //Sync balance by fetching transaction
            it('Transaction', async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () => useERC20(networkId, address, accounts[0], { balanceOf: 'Transaction' }),
                    {
                        wrapper,
                    },
                );

                //Two synchronous renders for useContractWithAbi
                await waitForNextUpdate(); //name
                await waitForNextUpdate(); //symbol
                await waitForNextUpdate(); //decimals
                await waitForNextUpdate(); //totalSupply
                await waitForNextUpdate(); //balanceOf

                assert.equal(result.all.length, 7, 'result.all.length != 7');

                //Mint function emits transaction with tx.from = <account>
                const receipt = await web3Contract.methods
                    .mint(accounts[0], 1)
                    .send({ from: accounts[0], gas: 2000000, gasPrice: '1' });

                store.dispatch(fetchTransaction({ networkId, hash: receipt.transactionHash }));

                await waitForNextUpdate(); //balanceOf gets updated by detecting new transaction

                const value = result.current;
                assert.equal(value.balanceOf, 2, 'balanceOf'); //updated balance
            });
            //Sync balance by fetching Transfer event
            it('onTransfer(to:accounts[0])', async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () =>
                        useERC20(networkId, address, accounts[0], {
                            balanceOf: createEventSync(networkId, 'Transfer', { to: accounts[0] }),
                        }),
                    {
                        wrapper,
                    },
                );

                //Two synchronous renders for useContractWithAbi
                await waitForNextUpdate(); //name
                await waitForNextUpdate(); //symbol
                await waitForNextUpdate(); //decimals
                await waitForNextUpdate(); //totalSupply
                await waitForNextUpdate(); //balanceOf

                assert.equal(result.all.length, 7, 'result.all.length != 7');

                //Mint function emits Transfer event with to = <accounts[0]>
                const receipt = await web3Contract.methods
                    .mint(accounts[0], 1)
                    .send({ from: accounts[0], gas: 2000000, gasPrice: '1' });

                //balanceOf gets updated by detecting new Transfer event
                store.dispatch(createEvent({ networkId, ...receipt.events.Transfer }));
                const value = result.current;
                assert.equal(value.balanceOf, 2, 'balanceOf'); //updated balance
            });
        });
    });
});

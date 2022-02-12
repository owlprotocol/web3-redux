import { assert } from 'chai';
// eslint-disable-next-line prettier/prettier
import { Provider } from 'react-redux';
import Web3 from 'web3';
import { Contract as Web3Contract } from 'web3-eth-contract';
import { renderHook } from '@testing-library/react-hooks';
import { getWeb3Provider, expectThrowsAsync } from '../../test';
import { networkId, IPFS_NFT_COLLECTION } from '../../test/data';

import ERC721 from '../../abis/ERC721PresetMinterPauserAutoId.json';

import { create as createNetwork } from '../../network/actions';
import { create as createTransaction } from '../../transaction/actions';
import { create as createBlock } from '../../block/actions';
import { create as createEvent } from '../../contractevent/actions';

import { name } from '../common';
import { createStore, StoreType } from '../../store';

import useERC721 from './useERC721';

//eslint-disable-next-line @typescript-eslint/no-var-requires
const jsdom = require('mocha-jsdom');

describe(`${name}/hooks/useERC721.test.tsx`, () => {
    jsdom({ url: 'http://localhost' });

    const baseUri = 'https://opensea-creatures-api.herokuapp.com/api/creature/';
    const baseUriIpfs = `ipfs://${IPFS_NFT_COLLECTION}/`;

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
        ({ store } = createStore());
        store.dispatch(createNetwork({ networkId, web3 }));
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    describe('useERC721()', async () => {
        it('default - HTTP metadata', async () => {
            web3Contract = await new web3.eth.Contract(ERC721.abi as any)
                .deploy({
                    arguments: ['Test NFT', 'TEST', baseUri],
                    data: ERC721.bytecode,
                })
                .send({ from: accounts[0], gas: 3000000, gasPrice: '875000000' });
            address = web3Contract.options.address;
            await web3Contract.methods
                .mint(accounts[0])
                .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });

            const { result, waitForNextUpdate } = renderHook(() => useERC721(networkId, address, '0'), {
                wrapper,
            });

            //Two synchronous renders for useContractWithAbi
            assert.equal(result.all.length, 2, 'result.all.length');
            await waitForNextUpdate(); //name
            await waitForNextUpdate(); //symbol
            await waitForNextUpdate(); //ownerOf
            await waitForNextUpdate(); //tokenURI
            await waitForNextUpdate(); //tokenURI Fetch HTTP
            assert.equal(result.all.length, 7, 'result.all.length');

            const value = result.current;
            assert.equal(value.name, 'Test NFT', 'name');
            assert.equal(value.symbol, 'TEST', 'symbol');
            assert.equal(value.ownerOf, accounts[0], 'ownerOf');
            assert.equal(value.tokenURI, `${baseUri}0`, 'tokenURI');
            assert.equal(value.metadata.name, 'Herbie Starbelly', 'metadata.name');

            assert.deepEqual(value.Transfer, [], 'Transfer');
            assert.deepEqual(value.Approval, [], 'Approval');

            assert.equal(result.all.length, 7, 'result.all.length');
            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });

        it('default - IPFS metadata', async () => {
            web3Contract = await new web3.eth.Contract(ERC721.abi as any)
                .deploy({
                    arguments: ['Test NFT', 'TEST', baseUriIpfs],
                    data: ERC721.bytecode,
                })
                .send({ from: accounts[0], gas: 3000000, gasPrice: '875000000' });
            address = web3Contract.options.address;
            await web3Contract.methods
                .mint(accounts[0])
                .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });
            await web3Contract.methods
                .mint(accounts[0])
                .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });

            const { result, waitForNextUpdate } = renderHook(() => useERC721(networkId, address, '1'), {
                wrapper,
            });

            //Two synchronous renders for useContractWithAbi
            assert.equal(result.all.length, 2, 'result.all.length');
            await waitForNextUpdate(); //name
            await waitForNextUpdate(); //symbol
            await waitForNextUpdate(); //ownerOf
            await waitForNextUpdate(); //tokenURI
            await waitForNextUpdate(); //GET/OBJECT (root)
            await waitForNextUpdate(); //CREATE (with childHash cid updating result of selectPathHash) + GET/OBJECT (root/1)
            await waitForNextUpdate(); //IPFS CAT
            assert.equal(result.all.length, 10, 'result.all.length');

            const value = result.current;
            assert.equal(value.name, 'Test NFT', 'name');
            assert.equal(value.symbol, 'TEST', 'symbol');
            assert.equal(value.ownerOf, accounts[0], 'ownerOf');
            assert.equal(value.tokenURI, `${baseUriIpfs}1`, 'tokenURI');
            assert.equal(value.metadata.name, 'Test NFT 1', 'metadata.name');

            assert.deepEqual(value.Transfer, [], 'Transfer');
            assert.deepEqual(value.Approval, [], 'Approval');

            assert.equal(result.all.length, 10, 'result.all.length');
            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
    });

    describe('useERC721() - sync options', async () => {
        beforeEach(async () => {
            web3Contract = await new web3.eth.Contract(ERC721.abi as any)
                .deploy({
                    arguments: ['Test NFT', 'TEST', baseUri],
                    data: ERC721.bytecode,
                })
                .send({ from: accounts[0], gas: 3000000, gasPrice: '875000000' });
            address = web3Contract.options.address;
            await web3Contract.methods
                .mint(accounts[0])
                .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });
        });
        describe('Transfer', () => {
            //Sync new transfer events
            it('sync', async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () => useERC721(networkId, address, '0', { TransferEventsOptions: { sync: true } }),
                    {
                        wrapper,
                    },
                );

                //Two synchronous renders for useContractWithAbi
                assert.equal(result.all.length, 2, 'result.all.length');
                await waitForNextUpdate(); //name
                await waitForNextUpdate(); //symbol
                await waitForNextUpdate(); //ownerOf
                await waitForNextUpdate(); //tokenURI
                await waitForNextUpdate(); //tokenURI Fetch HTTP
                assert.equal(result.all.length, 7, 'result.all.length');

                //Mint function emits Transfer event with to = <accounts[0]>
                web3Contract.methods
                    .transferFrom(accounts[0], accounts[1], 0)
                    .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });
                await waitForNextUpdate(); //update events

                const value = result.current;
                assert.equal(value.Transfer!.length, 1, 'Transfer');

                assert.equal(result.all.length, 8, 'result.all.length');
                //No additional re-renders frm background tasks
                await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
            });
            //Get past Transfer events
            it('past', async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () => useERC721(networkId, address, '0', { TransferEventsOptions: { past: true } }),
                    {
                        wrapper,
                    },
                );

                //Two synchronous renders for useContractWithAbi
                assert.equal(result.all.length, 2, 'result.all.length');
                await waitForNextUpdate(); //name
                await waitForNextUpdate(); //symbol
                await waitForNextUpdate(); //ownerOf
                await waitForNextUpdate(); //tokenURI
                await waitForNextUpdate(); //events
                await waitForNextUpdate(); //tokenURI Fetch HTTP
                assert.equal(result.all.length, 8, 'result.all.length');

                const value = result.current;
                assert.equal(value.Transfer!.length, 1, 'Transfer');

                assert.equal(result.all.length, 8, 'result.all.length');
                //No additional re-renders frm background tasks
                await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
            });
        });
        describe('ownerOf', () => {
            it('Transaction', async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () => useERC721(networkId, address, '0', { ownerOf: 'Transaction' }),
                    {
                        wrapper,
                    },
                );

                //Two synchronous renders for useContractWithAbi
                assert.equal(result.all.length, 2, 'result.all.length');
                await waitForNextUpdate(); //name
                await waitForNextUpdate(); //symbol
                await waitForNextUpdate(); //ownerOf
                await waitForNextUpdate(); //tokenURI
                await waitForNextUpdate(); //tokenURI Fetch HTTP
                assert.equal(result.all.length, 7, 'result.all.length');

                await web3Contract.methods
                    .transferFrom(accounts[0], accounts[1], 0)
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

                await waitForNextUpdate(); //ownerOf gets updated by detecting new transaction

                const value = result.current;
                assert.equal(value.ownerOf, accounts[1], 'ownerOf'); //updated balance

                assert.equal(result.all.length, 8, 'result.all.length');
                //No additional re-renders frm background tasks
                await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
            });
            it('Block', async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () => useERC721(networkId, address, '0', { ownerOf: 'Block' }),
                    {
                        wrapper,
                    },
                );

                //Two synchronous renders for useContractWithAbi
                assert.equal(result.all.length, 2, 'result.all.length');
                await waitForNextUpdate(); //name
                await waitForNextUpdate(); //symbol
                await waitForNextUpdate(); //ownerOf
                await waitForNextUpdate(); //tokenURI
                await waitForNextUpdate(); //tokenURI Fetch HTTP
                assert.equal(result.all.length, 7, 'result.all.length');

                await web3Contract.methods
                    .transferFrom(accounts[0], accounts[1], 0)
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
                assert.equal(value.ownerOf, accounts[1], 'ownerOf'); //updated owner
                assert.equal(result.all.length, 8, 'result.all.length');
                //No additional re-renders frm background tasks
                await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
            });
            it('onTransfer', async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () => useERC721(networkId, address, '0', { ownerOf: 'onTransfer' }),
                    {
                        wrapper,
                    },
                );

                //Two synchronous renders for useContractWithAbi
                assert.equal(result.all.length, 2, 'result.all.length');
                await waitForNextUpdate(); //name
                await waitForNextUpdate(); //symbol
                await waitForNextUpdate(); //ownerOf
                await waitForNextUpdate(); //tokenURI
                await waitForNextUpdate(); //tokenURI Fetch HTTP
                assert.equal(result.all.length, 7, 'result.all.length');

                await web3Contract.methods
                    .transferFrom(accounts[0], accounts[1], 0)
                    .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });
                //Create event, triggering a refresh
                store.dispatch(
                    createEvent({
                        networkId,
                        address,
                        blockHash: '0x1',
                        logIndex: 0,
                        name: 'Transfer',
                        returnValues: { from: accounts[0], to: accounts[1], tokenId: 0 },
                    }),
                );
                //Synchronous update to TransferTo events
                assert.equal(result.all.length, 8, 'result.all.length');
                await waitForNextUpdate();

                const value = result.current;
                assert.equal(value.ownerOf, accounts[1], 'ownerOf'); //updated owner
                assert.equal(result.all.length, 9, 'result.all.length');
                //No additional re-renders frm background tasks
                await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
            });
        });
    });
});

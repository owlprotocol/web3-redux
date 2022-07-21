import { assert } from 'chai';
// eslint-disable-next-line prettier/prettier
import { Provider } from 'react-redux';
import Web3 from 'web3';
import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import * as moxios from 'moxios';

import { useERC721 } from './useERC721.js';
import { cloneDeep } from '../../../utils/lodash/index.js';
import { getWeb3Provider, expectThrowsAsync } from '../../../test/index.js';
import { networkId } from '../../../test/data.js';
import { NFT_COLLECTION_QMHASH, moxiosIPFS, NFT_0 } from '../../../test/ipfs.js';

import { createStore, StoreType } from '../../../store.js';
import ConfigCRUD from '../../../config/crud.js';
import ContractEventCRUD from '../../../contractevent/crud.js';
import BlockCRUD from '../../../block/crud.js';
import TransactionCRUD from '../../../transaction/crud.js';
import NetworkCRUD from '../../../network/crud.js';

import { ERC721PresetMinterPauserAutoId } from '../../../typechain/ERC721PresetMinterPauserAutoId.js';
import { ERC721PresetMinterPauserAutoIdArtifact } from '../../../abis/index.js';

describe('contract/hooks/useERC721.test.tsx', () => {
    let store: StoreType;
    let wrapper: any;

    let web3: Web3; //Web3 loaded from store
    let accounts: string[];
    let web3Contract: ERC721PresetMinterPauserAutoId;
    let address: string;

    before(async () => {
        const provider = getWeb3Provider();
        //@ts-ignore
        web3 = new Web3(provider);
        accounts = await web3.eth.getAccounts();
        moxios.install(axios);
    });

    after(() => {
        moxios.uninstall(axios);
    });

    beforeEach(async () => {
        store = createStore();
        store.dispatch(NetworkCRUD.actions.create({ networkId, web3 }));
        //eslint-disable-next-line react/display-name
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
        web3Contract = (await new web3.eth.Contract(cloneDeep(ERC721PresetMinterPauserAutoIdArtifact.abi) as any)
            .deploy({
                arguments: ['Test NFT', 'TEST', `http://localhost/${NFT_COLLECTION_QMHASH}/`],
                data: ERC721PresetMinterPauserAutoIdArtifact.bytecode,
            })
            .send({
                from: accounts[0],
                gas: 3000000,
                gasPrice: '875000000',
            })) as unknown as ERC721PresetMinterPauserAutoId;
        address = web3Contract.options.address;
        await web3Contract.methods.mint(accounts[0]).send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });
    });
    it('defaults', async () => {
        const { result, waitForNextUpdate } = renderHook(
            () => useERC721(networkId, address, '0', { tokenURI: false, metadata: false }),
            {
                wrapper,
            },
        );

        //Two synchronous renders for useContractWithAbi
        assert.equal(result.all.length, 2, 'result.all.length');
        await waitForNextUpdate(); //name
        await waitForNextUpdate(); //symbol
        await waitForNextUpdate(); //ownerOf
        assert.equal(result.all.length, 5, 'result.all.length');

        const value = result.current;
        assert.equal(value.name, 'Test NFT', 'name');
        assert.equal(value.symbol, 'TEST', 'symbol');
        assert.equal(value.ownerOf, accounts[0], 'ownerOf');

        //No additional re-renders frm background tasks
        await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
    });

    describe('Transfer', () => {
        //Sync new transfer events
        it('sync', async () => {
            const { result, waitForNextUpdate } = renderHook(
                () =>
                    useERC721(networkId, address, '0', {
                        ownerOf: false,
                        tokenURI: false,
                        metadata: false,
                        TransferEventsOptions: { sync: true },
                    }),
                {
                    wrapper,
                },
            );

            //Two synchronous renders for useContractWithAbi
            assert.equal(result.all.length, 2, 'result.all.length');
            await waitForNextUpdate(); //name
            await waitForNextUpdate(); //symbol
            assert.equal(result.all.length, 4, 'result.all.length');

            //Mint function emits Transfer event with to = <accounts[0]>
            web3Contract.methods
                .transferFrom(accounts[0], accounts[1], 0)
                .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });
            await waitForNextUpdate(); //update events

            const value = result.current;
            assert.equal(value.Transfer!.length, 1, 'Transfer');

            assert.equal(result.all.length, 5, 'result.all.length');
            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
        //Get past Transfer events
        it('past', async () => {
            const { result, waitForNextUpdate } = renderHook(
                () =>
                    useERC721(networkId, address, '0', {
                        ownerOf: false,
                        tokenURI: false,
                        metadata: false,
                        TransferEventsOptions: { past: true },
                    }),
                {
                    wrapper,
                },
            );

            //Two synchronous renders for useContractWithAbi
            assert.equal(result.all.length, 2, 'result.all.length');
            await waitForNextUpdate(); //name
            await waitForNextUpdate(); //symbol
            assert.equal(result.all.length, 4, 'result.all.length');

            await waitForNextUpdate(); //update events
            const value = result.current;
            assert.equal(value.Transfer!.length, 1, 'Transfer');

            assert.equal(result.all.length, 5, 'result.all.length');
            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
    });
    describe('ownerOf', () => {
        it('Transaction', async () => {
            const { result, waitForNextUpdate } = renderHook(
                () => useERC721(networkId, address, '0', { ownerOf: 'Transaction', tokenURI: false, metadata: false }),
                {
                    wrapper,
                },
            );

            //Two synchronous renders for useContractWithAbi
            assert.equal(result.all.length, 2, 'result.all.length');
            await waitForNextUpdate(); //name
            await waitForNextUpdate(); //symbol
            await waitForNextUpdate(); //ownerOf
            assert.equal(result.all.length, 5, 'result.all.length');

            await web3Contract.methods
                .transferFrom(accounts[0], accounts[1], 0)
                .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });
            //Create transaction, triggering a refresh
            store.dispatch(
                TransactionCRUD.actions.create({
                    networkId,
                    hash: '0x1',
                    from: accounts[0],
                    to: address,
                }),
            );

            await waitForNextUpdate(); //ownerOf gets updated by detecting new transaction

            const value = result.current;
            assert.equal(value.ownerOf, accounts[1], 'ownerOf'); //updated balance

            assert.equal(result.all.length, 6, 'result.all.length');
            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
        it('Block', async () => {
            const { result, waitForNextUpdate } = renderHook(
                () => useERC721(networkId, address, '0', { ownerOf: 'Block', tokenURI: false, metadata: false }),
                {
                    wrapper,
                },
            );

            //Two synchronous renders for useContractWithAbi
            assert.equal(result.all.length, 2, 'result.all.length');
            await waitForNextUpdate(); //name
            await waitForNextUpdate(); //symbol
            await waitForNextUpdate(); //ownerOf
            assert.equal(result.all.length, 5, 'result.all.length');

            await web3Contract.methods
                .transferFrom(accounts[0], accounts[1], 0)
                .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });
            //Create block, triggering a refresh
            store.dispatch(
                BlockCRUD.actions.create({
                    networkId,
                    number: 1,
                }),
            );
            await waitForNextUpdate();

            const value = result.current;
            assert.equal(value.ownerOf, accounts[1], 'ownerOf'); //updated owner
            assert.equal(result.all.length, 6, 'result.all.length');
            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
        it('onTransfer', async () => {
            const { result, waitForNextUpdate } = renderHook(
                () => useERC721(networkId, address, '0', { ownerOf: 'onTransfer', tokenURI: false, metadata: false }),
                {
                    wrapper,
                },
            );

            //Two synchronous renders for useContractWithAbi
            assert.equal(result.all.length, 2, 'result.all.length');
            await waitForNextUpdate(); //name
            await waitForNextUpdate(); //symbol
            await waitForNextUpdate(); //ownerOf
            assert.equal(result.all.length, 5, 'result.all.length');

            await web3Contract.methods
                .transferFrom(accounts[0], accounts[1], 0)
                .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });
            //Create event, triggering a refresh
            store.dispatch(
                ContractEventCRUD.actions.create({
                    networkId,
                    address,
                    blockNumber: 1,
                    blockHash: '0x1',
                    logIndex: 0,
                    name: 'Transfer',
                    returnValues: { from: accounts[0], to: accounts[1], tokenId: 0 },
                }),
            );
            //Synchronous update to TransferTo events
            assert.equal(result.all.length, 6, 'result.all.length');
            await waitForNextUpdate();

            const value = result.current;
            assert.equal(value.ownerOf, accounts[1], 'ownerOf'); //updated owner
            assert.equal(result.all.length, 7, 'result.all.length');
            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
    });

    describe('useERC721() - metadata', async () => {
        it('HTTP metadata', async () => {
            //Moxios install
            await web3Contract.methods
                .mint(accounts[0])
                .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });

            const { result, waitForNextUpdate } = renderHook(
                () =>
                    useERC721(networkId, address, '0', {
                        ownerOf: false,
                        metadata: true,
                    }),
                {
                    wrapper,
                },
            );

            //Two synchronous renders for useContractWithAbi
            assert.equal(result.all.length, 2, 'result.all.length');
            await waitForNextUpdate(); //name
            await waitForNextUpdate(); //symbol
            await waitForNextUpdate(); //tokenURI
            assert.equal(result.all.length, 5, 'result.all.length');
            assert.equal(result.current.tokenURI, `http://localhost/${NFT_COLLECTION_QMHASH}/0`, 'tokenURI');

            //@ts-ignore
            await moxiosIPFS(); //fetch HTTP
            assert.equal(result.current.metadata.name, NFT_0.name, 'metadata.name');

            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
        it('IPFS metadata', async () => {
            //Contract setup
            web3Contract = (await new web3.eth.Contract(ERC721PresetMinterPauserAutoIdArtifact.abi as any)
                .deploy({
                    arguments: ['Test NFT', 'TEST', `ipfs://${NFT_COLLECTION_QMHASH}/`],
                    data: ERC721PresetMinterPauserAutoIdArtifact.bytecode,
                })
                .send({
                    from: accounts[0],
                    gas: 3000000,
                    gasPrice: '875000000',
                })) as unknown as ERC721PresetMinterPauserAutoId;
            address = web3Contract.options.address;
            await web3Contract.methods
                .mint(accounts[0])
                .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });
            await web3Contract.methods
                .mint(accounts[0])
                .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });

            //IPFS Mock
            store.dispatch(ConfigCRUD.actions.update({ id: '0' }));

            //Hook
            const { result, waitForNextUpdate } = renderHook(
                () =>
                    useERC721(networkId, address, '0', {
                        ownerOf: false,
                        metadata: true,
                    }),
                {
                    wrapper,
                },
            );

            //Two synchronous renders for useContractWithAbi
            assert.equal(result.all.length, 2, 'result.all.length');
            await waitForNextUpdate(); //name
            await waitForNextUpdate(); //symbol
            await waitForNextUpdate(); //tokenURI
            assert.equal(result.all.length, 6, 'result.all.length');
            assert.equal(result.current.tokenURI, `ipfs://${NFT_COLLECTION_QMHASH}/0`, 'tokenURI');

            await moxiosIPFS(); //GET/OBJECT (root)
            await moxiosIPFS(); //GET/OBJECT (root/1)
            await moxiosIPFS(); //CAT (root/1)
            assert.equal(result.current.metadata.name, NFT_0.name, 'metadata.name');

            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
    });
});

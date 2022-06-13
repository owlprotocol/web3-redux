import { assert } from 'chai';
// eslint-disable-next-line prettier/prettier
import { Provider } from 'react-redux';
import Web3 from 'web3';
import type { Contract as Web3Contract } from 'web3-eth-contract';
import { renderHook } from '@testing-library/react-hooks';
import jsdom from 'mocha-jsdom';
import { useERC721TokenIds } from './useERC721TokenIds.js';
import { cloneDeep } from '../../utils/lodash/index.js';
import { getWeb3Provider, expectThrowsAsync } from '../../test/index.js';
import { networkId } from '../../test/data.js';
import { NFT_COLLECTION_QMHASH } from '../../test/ipfs.js';

import { ERC721PresetMinterPauserAutoId } from '../../abis/index.js';

import { create as createNetwork } from '../../network/actions/index.js';
import { createStore, StoreType } from '../../store.js';

describe('contract/hooks/useERC721TokenIds.test.tsx', () => {
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
        ({ store } = createStore());
        store.dispatch(createNetwork({ networkId, web3 }));
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
        web3Contract = await new web3.eth.Contract(cloneDeep(ERC721PresetMinterPauserAutoId.abi) as any)
            .deploy({
                arguments: ['Test NFT', 'TEST', `http://localhost/${NFT_COLLECTION_QMHASH}/`],
                data: ERC721PresetMinterPauserAutoId.bytecode,
            })
            .send({ from: accounts[0], gas: 3000000, gasPrice: '875000000' });
        address = web3Contract.options.address;
        await web3Contract.methods.mint(accounts[0]).send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });
    });
    it('tokenIds = [0]', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useERC721TokenIds(networkId, address), {
            wrapper,
        });

        assert.equal(result.all.length, 2, 'result.all.length');
        await waitForNextUpdate();

        const value = result.current;
        const tokenIds = value[0];
        assert.deepEqual(tokenIds, ['0'], 'tokenIds != [0]');

        //No additional re-renders frm background tasks
        await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
    });
});

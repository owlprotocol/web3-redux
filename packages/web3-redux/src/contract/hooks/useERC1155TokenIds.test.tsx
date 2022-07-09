import { assert } from 'chai';
// eslint-disable-next-line prettier/prettier
import { Provider } from 'react-redux';
import Web3 from 'web3';
import type { Contract as Web3Contract } from 'web3-eth-contract';
import { renderHook } from '@testing-library/react-hooks';
import jsdom from 'mocha-jsdom';
import { useERC1155TokenIds } from './useERC1155TokenIds.js';
import { cloneDeep } from '../../utils/lodash/index.js';
import { getWeb3Provider, expectThrowsAsync } from '../../test/index.js';
import { networkId } from '../../test/data.js';

import { ERC1155PresetMinterPauser } from '../../abis/index.js';

import { createStore, StoreType } from '../../store.js';
import NetworkCRUD from '../../network/crud.js';

describe('contract/hooks/useERC1155TokenIds.test.tsx', () => {
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
        web3Contract = await new web3.eth.Contract(cloneDeep(ERC1155PresetMinterPauser.abi) as any)
            .deploy({
                arguments: ['http://example.com/{id}'],
                data: ERC1155PresetMinterPauser.bytecode,
            })
            .send({ from: accounts[0], gas: 4000000, gasPrice: '875000000' });
        address = web3Contract.options.address;

        await web3Contract.methods
            .mint(accounts[0], '0', 1, '0x')
            .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });

        ({ store } = createStore());
        store.dispatch(NetworkCRUD.actions.create({ networkId, web3 }));
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });
    it('tokenIds = [0]', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useERC1155TokenIds(networkId, address), {
            wrapper,
        });

        assert.equal(result.all.length, 2, 'result.all.length');
        await waitForNextUpdate();

        const value = result.current!;
        const tokenIds = value[0];
        assert.deepEqual(tokenIds, ['0'], 'tokenIds != [0]');

        //No additional re-renders frm background tasks
        await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
    });
});

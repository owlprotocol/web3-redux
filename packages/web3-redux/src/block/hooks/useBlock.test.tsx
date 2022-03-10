import { assert } from 'chai';
import Web3 from 'web3';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';

import { create as createNetwork } from '../../network/actions/index.js';

import { name } from '../common.js';
import { networkId, block1 } from '../../test/data.js';

import { createStore, StoreType } from '../../store.js';
import { create } from '../actions/index.js';
import { BlockTransaction, validate } from '../model/index.js';
import { getWeb3Provider } from '../../test/index.js';
import { useBlock } from './index.js';

//eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-commonjs
const jsdom = require('mocha-jsdom');

describe(`${name}/hooks/useBlock.test.tsx`, () => {
    jsdom({ url: 'http://localhost' });

    let store: StoreType;
    let item: BlockTransaction;

    let wrapper: any;
    before(async () => {
        item = { networkId, number: 0, transactions: [] };
    });

    beforeEach(() => {
        ({ store } = createStore());
        store.dispatch(create(item));
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    describe('useBlock', () => {
        let web3: Web3; //Web3 loaded from store
        let accounts: string[];
        let expected: BlockTransaction;

        before(async () => {
            const provider = getWeb3Provider();
            //@ts-ignore
            web3 = new Web3(provider);
            accounts = await web3.eth.getAccounts();
        });

        beforeEach(async () => {
            store.dispatch(createNetwork({ networkId, web3 }));

            const txSent = await web3.eth.sendTransaction({ from: accounts[0], to: accounts[1], value: '1' });
            const block = await web3.eth.getBlock(txSent.blockNumber);
            expected = validate({
                networkId,
                ...block,
                transactions: [{ networkId, hash: txSent.transactionHash }],
            });
        });

        it('(networkId, number, true)', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useBlock(networkId, expected.number, true), {
                wrapper,
            });

            await waitForNextUpdate();

            const currentCall = result.current;
            assert.deepEqual(currentCall, expected, 'result.current');
        });

        it('(networkId, number, false)', async () => {
            store.dispatch(create(block1));

            const { result } = renderHook(() => useBlock(networkId, block1.number, true), {
                wrapper,
            });

            const currentCall = result.current;
            assert.deepEqual(currentCall, { ...block1, transactions: [] }, 'result.current');
        });

        it('(networkId, number, ifnull): null', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useBlock(networkId, expected.number, 'ifnull'), {
                wrapper,
            });

            await waitForNextUpdate();

            const currentCall = result.current;
            assert.deepEqual(currentCall, expected, 'result.current');
        });

        it('(networkId, number, ifnull): defined', async () => {
            store.dispatch(create(block1));

            const { result } = renderHook(() => useBlock(networkId, block1.number, 'ifnull'), {
                wrapper,
            });

            const currentCall = result.current;
            assert.deepEqual(currentCall, { ...block1, transactions: [] }, 'result.current');
        });
    });
});

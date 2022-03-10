import { assert } from 'chai';
import Web3 from 'web3';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { getWeb3Provider } from '../../test';

import { networkId, transaction1 } from '../../test/data';
import { create as createNetwork } from '../../network/actions';
import { create as createTransaction } from '../actions';

import { name } from '../common';
import { createStore, StoreType } from '../../store';
import { Transaction, validate } from '../model/interface';
import { useTransaction } from './index';

//eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-commonjs
const jsdom = require('mocha-jsdom');

describe(`${name}/hooks/useTransaction.tsx`, () => {
    jsdom({ url: 'http://localhost' });

    let store: StoreType;
    let wrapper: any;

    let web3: Web3; //Web3 loaded from store
    let accounts: string[];
    let expected: Transaction;

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

        const txSent = await web3.eth.sendTransaction({ from: accounts[0], to: accounts[1], value: '1' });
        const tx = await web3.eth.getTransaction(txSent.transactionHash);
        expected = validate({ networkId, ...tx });
    });

    describe('useTransaction', () => {
        it('(networkId, hash, true)', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useTransaction(networkId, expected.hash, true), {
                wrapper,
            });

            await waitForNextUpdate();

            const currentCall = result.current;
            assert.deepEqual(currentCall, expected, 'result.current');
        });

        it('(networkId, hash, false)', async () => {
            store.dispatch(createTransaction(transaction1));

            const { result } = renderHook(() => useTransaction(networkId, transaction1.hash, false), {
                wrapper,
            });

            const currentCall = result.current;
            assert.deepEqual(currentCall, transaction1, 'result.current');
        });

        it('(networkId, hash, ifnull): null', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useTransaction(networkId, expected.hash, 'ifnull'), {
                wrapper,
            });

            await waitForNextUpdate();

            const currentCall = result.current;
            assert.deepEqual(currentCall, expected, 'result.current');
        });

        it('(networkId, hash, ifnull): defined', async () => {
            store.dispatch(createTransaction(transaction1));

            const { result } = renderHook(() => useTransaction(networkId, transaction1.hash, 'ifnull'), {
                wrapper,
            });

            const currentCall = result.current;
            assert.deepEqual(currentCall, transaction1, 'result.current');
        });
    });
});

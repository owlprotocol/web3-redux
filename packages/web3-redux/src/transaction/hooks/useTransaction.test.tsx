import { assert } from 'chai';
import Web3 from 'web3';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';

import { getWeb3Provider } from '../../test/index.js';

import { networkId, transaction1 } from '../../test/data.js';

import { name } from '../common.js';
import { createStore, StoreType } from '../../store.js';
import { Transaction, validate } from '../model/interface.js';
import NetworkCRUD from '../../network/crud.js';
import TransactionCRUD from '../crud.js';
import { useTransaction } from './index.js';

describe(`${name}/hooks/useTransaction.tsx`, () => {
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
        store = createStore();
        store.dispatch(NetworkCRUD.actions.create({ networkId, web3 }));
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
            store.dispatch(TransactionCRUD.actions.create(transaction1));

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
            store.dispatch(TransactionCRUD.actions.create(transaction1));

            const { result } = renderHook(() => useTransaction(networkId, transaction1.hash, 'ifnull'), {
                wrapper,
            });

            const currentCall = result.current;
            assert.deepEqual(currentCall, transaction1, 'result.current');
        });
    });
});

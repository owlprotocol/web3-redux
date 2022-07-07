import { assert } from 'chai';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import Web3 from 'web3';
import jsdom from 'mocha-jsdom';
import { useGetBalance } from './useGetBalance.js';
import { getWeb3Provider, expectThrowsAsync } from '../../test/index.js';
import { networkId, ADDRESS_0 } from '../../test/data.js';

import { createAction as createNetwork } from '../../network/actions/index.js';
import { createAction as createTransaction } from '../../transaction/actions/index.js';
import { createAction as createBlock } from '../../block/actions/index.js';

import { name } from '../common.js';
import { createStore, StoreType } from '../../store.js';


describe(`${name}/hooks/useGetBalance.test.tsx`, () => {
    jsdom({ url: 'http://localhost' });

    let web3: Web3;
    let store: StoreType;
    let wrapper: any;
    let address: string;

    before(async () => {
        const provider = getWeb3Provider();
        //@ts-ignore
        web3 = new Web3(provider);

        const accounts = await web3.eth.getAccounts();
        address = accounts[0];
    });

    beforeEach(() => {
        ({ store } = createStore());
        store.dispatch(createNetwork({ networkId, web3 }));
        store.dispatch(ContractCRUD.actions.create({ networkId, address }));
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    describe('useGetBalance', () => {
        it('(networkId, address, once)', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useGetBalance(networkId, address, 'once'), {
                wrapper,
            });
            await waitForNextUpdate();
            const expected = await web3.eth.getBalance(address);
            assert.equal(result.current, expected, 'contract.balance != expected');
            assert.deepEqual(result.all, [undefined, expected], 'result.all');
            //No additional re-renders from background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });

        it('(networkId, address, false)', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useGetBalance(networkId, address, false), {
                wrapper,
            });
            assert.isUndefined(result.current);
            assert.deepEqual(result.all, [undefined], 'result.all');
            //No additional re-renders from background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });

        it('(networkId, address, ifnull)', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useGetBalance(networkId, address, 'ifnull'), {
                wrapper,
            });
            await waitForNextUpdate();
            const expected = await web3.eth.getBalance(address);
            assert.equal(result.current, expected, 'contract.balance != expected');
            assert.deepEqual(result.all, [undefined, expected], 'result.all');
            //No additional re-renders from background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });

        it('(networkId, address, Transaction)', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useGetBalance(networkId, address, 'Transaction'), {
                wrapper,
            });

            await waitForNextUpdate();
            const expected1 = await web3.eth.getBalance(address);
            const value1 = result.current;
            assert.equal(value1, expected1, 'contract.balance != expected');

            await web3.eth.sendTransaction({ from: address, to: ADDRESS_0, value: '1' });
            //Create transaction, triggering a refresh
            store.dispatch(
                createTransaction({
                    networkId,
                    hash: '0x1',
                    from: address,
                    to: ADDRESS_0,
                }),
            );
            await waitForNextUpdate();

            const expected2 = await web3.eth.getBalance(address);
            const value2 = result.current;
            assert.equal(value2, expected2, 'contract.balance');
            assert.deepEqual(result.all, [undefined, value1, value2], 'result.all');
            //No additional re-renders from background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });

        it('(networkId, address, Block)', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useGetBalance(networkId, address, 'Block'), {
                wrapper,
            });

            assert.equal(result.all.length, 1, 'result.all.length');
            await waitForNextUpdate();
            assert.equal(result.all.length, 2, 'result.all.length');

            const expected1 = await web3.eth.getBalance(address);
            assert.equal(result.current, expected1, 'contract.balance != expected');

            await web3.eth.sendTransaction({ from: address, to: ADDRESS_0, value: '1' });
            //Create block, triggering a refresh
            store.dispatch(
                createBlock({
                    networkId,
                    number: 1,
                }),
            );
            //synchronous re-render due to Network/SET/LATESTBLOCKNUMBER
            assert.equal(result.all.length, 3, 'result.all.length');
            await waitForNextUpdate(); //re-render due to Contract/SET/BALANCE

            const expected2 = await web3.eth.getBalance(address);
            assert.equal(result.current, expected2, 'contract.balance');
            assert.equal(result.all.length, 4, 'result.all.length');
            //No additional re-renders from background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
    });
});

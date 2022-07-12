import { assert } from 'chai';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import Web3 from 'web3';

import { useGetBalance } from './useGetBalance.js';
import { getWeb3Provider, expectThrowsAsync } from '../../test/index.js';
import { networkId, ADDRESS_0 } from '../../test/data.js';

import { name } from '../common.js';
import { createStore, StoreType } from '../../store.js';
import NetworkCRUD from '../../network/crud.js';
import ContractCRUD from '../crud.js';
import TransactionCRUD from '../../transaction/crud.js';
import BlockCRUD from '../../block/crud.js';
import { network1336 } from '../../network/data.js';

const networkId = network1336.networkId;
const web3 = network1336.web3!;

describe(`${name}/hooks/useGetBalance.test.tsx`, () => {
    let store: StoreType;
    let wrapper: any;
    let address: string;

    before(async () => {
        const accounts = await web3.eth.getAccounts();
        address = accounts[0];
    });

    beforeEach(() => {
        store = createStore();
        store.dispatch(NetworkCRUD.actions.create({ networkId, web3 }));
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

            //No additional re-renders from background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });

        it('(networkId, address, false)', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useGetBalance(networkId, address, false), {
                wrapper,
            });
            assert.isUndefined(result.current);

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
                TransactionCRUD.actions.create({
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
                BlockCRUD.actions.create({
                    networkId,
                    number: 1,
                }),
            );
            await waitForNextUpdate(); //re-render due to Contract/SET/BALANCE

            const expected2 = await web3.eth.getBalance(address);
            assert.equal(result.current, expected2, 'contract.balance');

            //No additional re-renders from background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
    });
});

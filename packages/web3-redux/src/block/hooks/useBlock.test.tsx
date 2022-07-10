import { assert } from 'chai';
import Web3 from 'web3';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import jsdom from 'mocha-jsdom';

import { name } from '../common.js';

import { createStore, StoreType } from '../../store.js';
import { BlockTransaction, validate } from '../model/index.js';
import NetworkCRUD from '../../network/crud.js';
import BlockCRUD from '../crud.js';
import { network1336 } from '../../network/data.js';
import getDB from '../../db.js';
import sleep from '../../utils/sleep.js';
import { useBlock } from './index.js';

const db = getDB();
const networkId = network1336.networkId;
const web3 = network1336.web3!;

describe(`${name}/hooks/useBlock.test.tsx`, () => {
    jsdom({ url: 'http://localhost' });

    let store: StoreType;

    let wrapper: any;

    beforeEach(() => {
        store = createStore();
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    afterEach(async () => {
        //await sleep(1000);
        //await db.clear();
    });

    describe('useBlock', () => {
        let accounts: string[];
        let expected: BlockTransaction;

        before(async () => {
            //@ts-ignore
            accounts = await web3.eth.getAccounts();
        });

        beforeEach(async () => {
            store.dispatch(NetworkCRUD.actions.create({ networkId, web3 }));

            const txSent = await web3.eth.sendTransaction({ from: accounts[0], to: accounts[1], value: '1' });
            const block = await web3.eth.getBlock(txSent.blockNumber);
            expected = validate({
                networkId,
                ...block,
            });
        });

        it.skip('(networkId, number, true)', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useBlock(networkId, expected.number, true), {
                wrapper,
            });

            await waitForNextUpdate();

            const currentCall = result.current;
            assert.deepEqual(currentCall, expected, 'result.current');
        });

        it('(networkId, number, false)', async () => {
            store.dispatch(BlockCRUD.actions.create(expected));

            const { result } = renderHook(() => useBlock(networkId, expected.number, false), {
                wrapper,
            });

            const currentCall = result.current;
            assert.deepEqual(currentCall, expected, 'result.current');
        });

        it.skip('(networkId, number, ifnull): null', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useBlock(networkId, expected.number, 'ifnull'), {
                wrapper,
            });

            await waitForNextUpdate();

            const currentCall = result.current;
            assert.deepEqual(currentCall, expected, 'result.current');
        });

        it.skip('(networkId, number, ifnull): defined', async () => {
            store.dispatch(BlockCRUD.actions.create(expected));

            const { result } = renderHook(() => useBlock(networkId, expected.number, 'ifnull'), {
                wrapper,
            });

            const currentCall = result.current;
            assert.deepEqual(currentCall, expected, 'result.current');
        });
    });
});

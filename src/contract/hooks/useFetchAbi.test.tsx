import { assert } from 'chai';
import axios from 'axios';
import moxios from 'moxios';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';

import WETH from '../../abis/WETH.json';

import { create as createNetwork } from '../../network/actions';

import { networkId } from '../../test/data';
import { createStore, StoreType } from '../../store';
import { create } from '../actions';

import useFetchAbi from './useFetchAbi';
//eslint-disable-next-line @typescript-eslint/no-var-requires
const jsdom = require('mocha-jsdom');

describe('contract/hooks/useFetchAbi.test.tsx', () => {
    jsdom({ url: 'http://localhost' });

    let store: StoreType;
    let wrapper: any;

    const address = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'; //WETH contract
    const client = axios.create({ baseURL: 'https://api.etherscan.io/api' });

    before(async () => {
        //Moxios install
        moxios.install(client);
    });

    after(() => {
        moxios.uninstall(client);
    });

    beforeEach(() => {
        ({ store } = createStore());
        store.dispatch(
            createNetwork({
                networkId,
                explorerApiClient: client,
            }),
        );
        store.dispatch(create({ networkId, address }));
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    describe('useFetchAbi', () => {
        it('(networkId, address, true)', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useFetchAbi(networkId, address, true), {
                wrapper,
            });

            await moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                assert.deepEqual(request.config.params, { module: 'contract', action: 'getabi', address });
                request.respondWith({ status: 200, response: { result: JSON.stringify(WETH.abi) } });
            });
            await waitForNextUpdate();

            assert.deepEqual(result.current, WETH.abi as any, 'contract.abi != WETH.abi');
            assert.deepEqual(result.all, [undefined, WETH.abi as any], 'result.all');
        });

        it('(networkId, address, false)', async () => {
            const { result } = renderHook(() => useFetchAbi(networkId, address, false), {
                wrapper,
            });
            assert.isUndefined(result.current);
            assert.deepEqual(result.all, [undefined], 'result.all');
        });

        it('(networkId, address, ifnull)', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useFetchAbi(networkId, address, 'ifnull'), {
                wrapper,
            });
            await moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                assert.deepEqual(request.config.params, { module: 'contract', action: 'getabi', address });
                request.respondWith({ status: 200, response: { result: JSON.stringify(WETH.abi) } });
            });
            await waitForNextUpdate();
            assert.deepEqual(result.current, WETH.abi as any, 'contract.abi != WETH.abi');
            assert.deepEqual(result.all, [undefined, WETH.abi as any], 'result.all');
        });
    });
});

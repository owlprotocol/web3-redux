import { Provider } from 'react-redux';
import { assert } from 'chai';
import axios from 'axios';
import * as moxios from 'moxios';
import { renderHook } from '@testing-library/react-hooks';
import { useFetchAbi } from './useFetchAbi';
import { create as createNetwork } from '../../network/actions';
import { create } from '../actions';
import * as WETH from '../../abis/WETH.json';
import { WETH as WETH_ADDRESS, networkId } from '../../test/data';
import { StoreType, createStore } from '../../store';

//eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-commonjs
const jsdom = require('mocha-jsdom');

describe('contract/hooks/useFetchAbi.test.tsx', () => {
    jsdom({ url: 'http://localhost' });

    let store: StoreType;
    let wrapper: any;

    const address = WETH_ADDRESS; //WETH contract
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

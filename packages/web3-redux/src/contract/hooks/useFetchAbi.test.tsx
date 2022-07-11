import { Provider } from 'react-redux';
import { assert } from 'chai';
import axios from 'axios';
import * as moxios from 'moxios';
import { renderHook } from '@testing-library/react-hooks';

import { useFetchAbi } from './useFetchAbi.js';

import { WETH } from '../../abis/index.js';
import { WETH as WETH_ADDRESS, networkId } from '../../test/data.js';
import { StoreType, createStore } from '../../store.js';
import NetworkCRUD from '../../network/crud.js';
import ContractCRUD from '../crud.js';

describe('contract/hooks/useFetchAbi.test.tsx', () => {


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
        store = createStore();
        store.dispatch(
            NetworkCRUD.actions.create({
                networkId,
                explorerApiClient: client,
            }),
        );
        store.dispatch(ContractCRUD.actions.create({ networkId, address }));
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

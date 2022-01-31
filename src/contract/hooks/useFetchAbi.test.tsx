import { assert } from 'chai';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import WETH from '../../abis/WETH.json';

import { create as createNetwork } from '../../network/actions';

import { name } from '../common';
import { networkId } from '../../test/data';
import { createStore, StoreType } from '../../store';
import { create } from '../actions';

import useFetchAbi from './useFetchAbi';
import { ETHERSCAN_API_KEY } from '../../environment';

//eslint-disable-next-line @typescript-eslint/no-var-requires
const jsdom = require('mocha-jsdom');

describe(`${name}/hooks/useFetchAbi.test.tsx`, () => {
    jsdom({ url: 'http://localhost' });

    let store: StoreType;
    let wrapper: any;

    const address = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'; //WETH Contract

    beforeEach(() => {
        ({ store } = createStore());
        store.dispatch(
            createNetwork({
                networkId,
                explorerApiUrl: 'https://api.etherscan.io/api',
                explorerApiKey: ETHERSCAN_API_KEY,
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
            await waitForNextUpdate();
            assert.deepEqual(result.current, WETH.abi as any, 'contract.abi != WETH.abi');
        });

        it('(networkId, address, false)', async () => {
            const { result } = renderHook(() => useFetchAbi(networkId, address, false), {
                wrapper,
            });
            assert.isUndefined(result.current);
        });

        it('(networkId, address, ifnull)', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useFetchAbi(networkId, address, 'ifnull'), {
                wrapper,
            });
            await waitForNextUpdate();
            assert.deepEqual(result.current, WETH.abi as any, 'contract.abi != WETH.abi');
        });
    });
});

import { assert } from 'chai';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import Web3 from 'web3';
import { getWeb3Provider } from '../../test';

import { create as createNetwork } from '../../network/actions';

import { name } from '../common';
import { networkId } from '../../test/data';
import { createStore, StoreType } from '../../store';
import { create } from '../actions';

import useGetCode from './useGetCode';

//eslint-disable-next-line @typescript-eslint/no-var-requires
const jsdom = require('mocha-jsdom');

describe(`${name}/hooks/useGetCode.test.tsx`, () => {
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
        store.dispatch(create({ networkId, address }));
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    describe('useGetCode', () => {
        it('(networkId, address, true)', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useGetCode(networkId, address, true), {
                wrapper,
            });
            await waitForNextUpdate();
            assert.equal(result.current, '0x', 'contract.code != 0x');
            assert.deepEqual(result.all, [undefined, '0x'], 'result.all');
        });

        it('(networkId, address, false)', async () => {
            const { result } = renderHook(() => useGetCode(networkId, address, false), {
                wrapper,
            });
            assert.isUndefined(result.current);
            assert.deepEqual(result.all, [undefined], 'result.all');
        });

        it('(networkId, address, ifnull)', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useGetCode(networkId, address, 'ifnull'), {
                wrapper,
            });
            await waitForNextUpdate();
            assert.equal(result.current, '0x', 'contract.code != 0x');
            assert.deepEqual(result.all, [undefined, '0x'], 'result.all');
        });
    });
});

import { assert } from 'chai';
import { Provider } from 'react-redux';
import Ganache from 'ganache-core';
import Web3 from 'web3';
import { Contract as Web3Contract } from 'web3-eth-contract';
import { renderHook, act } from '@testing-library/react-hooks';
import ERC165 from '../../abis/ERC165.json';

import { create as createNetwork } from '../../network/actions';

import { name } from '../common';
import { networkId } from '../../test/data';
import { createStore, StoreType } from '../../store';
import { create } from '../actions';

import useSupportsInterface from '../hooks/useSupportsInterface';

//eslint-disable-next-line @typescript-eslint/no-var-requires
const jsdom = require('mocha-jsdom');

describe(`${name}/hooks/useSupportsInterface.test.tsx`, () => {
    jsdom({ url: 'http://localhost' });

    let store: StoreType;
    let wrapper: any;

    let web3: Web3; //Web3 loaded from store
    let accounts: string[];
    let web3Contract: Web3Contract;
    let address: string;

    before(async () => {
        const provider = Ganache.provider({
            networkId: parseInt(networkId),
        });
        //@ts-ignore
        web3 = new Web3(provider);

        accounts = await web3.eth.getAccounts();
    });

    beforeEach(async () => {
        web3Contract = await new web3.eth.Contract(ERC165.abi as any)
            .deploy({
                data: ERC165.bytecode,
            })
            .send({ from: accounts[0], gas: 1000000, gasPrice: '1' });
        address = web3Contract.options.address;

        ({ store } = createStore());
        store.dispatch(createNetwork({ networkId, web3 }));
        store.dispatch(
            create({
                networkId,
                address,
                abi: ERC165.abi as any,
            }),
        );
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    describe('useSupportsInterface()', async () => {
        it('supportsInterface(): false', async () => {
            const { result, waitForNextUpdate } = renderHook(
                () => useSupportsInterface(networkId, address, '0x00000000'),
                {
                    wrapper,
                },
            );

            act(() => {
                result.current[1].subscribe();
            });

            await waitForNextUpdate();

            const [value] = result.current;
            assert.isFalse(value, 'result.current');
            assert.deepEqual(
                //@ts-expect-error
                result.all.map((x) => x[0]),
                [undefined, false],
                'result.all',
            );
        });

        it('supportsInterface(): true', async () => {
            const { result, waitForNextUpdate } = renderHook(
                () => useSupportsInterface(networkId, address, '0x01ffc9a7'),
                {
                    wrapper,
                },
            );

            act(() => {
                result.current[1].subscribe();
            });

            await waitForNextUpdate();

            const [value] = result.current;
            assert.isTrue(value, 'result.current');
            assert.deepEqual(
                //@ts-expect-error
                result.all.map((x) => x[0]),
                [undefined, true],
                'result.all',
            );
        });
    });
});

import { assert } from 'chai';
import Web3 from 'web3';
import { renderHook, act } from '@testing-library/react-hooks';

import { name } from '../common';
import { networkId } from '../../test/data';
import { StoreType } from '../../store';
import { useSupportsInterface } from '.';
// eslint-disable-next-line import/no-unresolved
import { beforeFn, beforeEachFn, deployERC165Contract } from './index.test';

//eslint-disable-next-line @typescript-eslint/no-var-requires
const jsdom = require('mocha-jsdom');

describe(`${name}.hooks.useSupportsInterface`, () => {
    jsdom({ url: 'http://localhost' });

    let store: StoreType;
    let wrapper: any;

    let web3: Web3; //Web3 loaded from store
    let accounts: string[];
    let address: string;

    before(async () => {
        ({ web3, accounts } = await beforeFn());
    });

    beforeEach(async () => {
        ({ store, wrapper } = beforeEachFn({ web3 }));
        ({ address } = await deployERC165Contract({ web3, store, from: accounts[0] }));
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
        });
    });
});

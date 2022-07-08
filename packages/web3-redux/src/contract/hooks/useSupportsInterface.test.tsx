import { assert } from 'chai';
import { Provider } from 'react-redux';
import Web3 from 'web3';
import type { Contract as Web3Contract } from 'web3-eth-contract';
import { renderHook } from '@testing-library/react-hooks';
import jsdom from 'mocha-jsdom';
import { getWeb3Provider, expectThrowsAsync } from '../../test/index.js';

import { ERC165 } from '../../abis/index.js';



import { name } from '../common.js';
import { networkId } from '../../test/data.js';
import { createStore, StoreType } from '../../store.js';


import { useSupportsInterface } from '../hooks/useSupportsInterface.js';

describe(`${name}/hooks/useSupportsInterface.test.tsx`, () => {
    jsdom({ url: 'http://localhost' });

    let store: StoreType;
    let wrapper: any;

    let web3: Web3; //Web3 loaded from store
    let accounts: string[];
    let web3Contract: Web3Contract;
    let address: string;

    before(async () => {
        const provider = getWeb3Provider();
        //@ts-ignore
        web3 = new Web3(provider);

        accounts = await web3.eth.getAccounts();
    });

    beforeEach(async () => {
        web3Contract = await new web3.eth.Contract(ERC165.abi as any)
            .deploy({
                data: ERC165.bytecode,
            })
            .send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
        address = web3Contract.options.address;

        ({ store } = createStore());
        store.dispatch(NetworkCRUD.actions.create({ networkId, web3 }));
        store.dispatch(
            createAction({
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

            assert.equal(result.all.length, 1, 'result.all.length');
            await waitForNextUpdate();

            const value = result.current;
            assert.isFalse(value, 'result.current');
            assert.deepEqual(result.all, [undefined, false], 'result.all');
            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });

        it('supportsInterface(): true', async () => {
            const { result, waitForNextUpdate } = renderHook(
                () => useSupportsInterface(networkId, address, '0x01ffc9a7'),
                {
                    wrapper,
                },
            );

            assert.equal(result.all.length, 1, 'result.all.length');
            await waitForNextUpdate();

            const value = result.current;
            assert.isTrue(value, 'result.current');
            assert.deepEqual(result.all, [undefined, true], 'result.all');
            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
    });
});

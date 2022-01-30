import { assert } from 'chai';
import Web3 from 'web3';
import ganache from 'ganache-core';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';

import { sleep } from '../../utils';
import { networkId } from '../../test/data';
import { create as createNetwork } from '../../network/actions';

import { name } from '../common';
import { createStore, StoreType } from '../../store';
import { Transaction, validate } from '../model/interface';
import { useTransaction } from './index';

//eslint-disable-next-line @typescript-eslint/no-var-requires
const jsdom = require('mocha-jsdom');

describe(`${name}.hooks`, () => {
    jsdom({ url: 'http://localhost' });

    let store: StoreType;
    let wrapper: any;

    let web3: Web3; //Web3 loaded from store
    let accounts: string[];
    let expected: Transaction;

    before(async () => {
        const provider = ganache.provider({
            networkId: parseInt(networkId),
        });
        //@ts-ignore
        web3 = new Web3(provider);
        accounts = await web3.eth.getAccounts();
    });

    beforeEach(async () => {
        ({ store } = createStore());
        store.dispatch(createNetwork({ networkId, web3 }));
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;

        const txSent = await web3.eth.sendTransaction({ from: accounts[0], to: accounts[1], value: '1' });
        const tx = await web3.eth.getTransaction(txSent.transactionHash);
        expected = validate({ networkId, ...tx });
    });

    describe('useTransaction', () => {
        it('(networkId, hash)', async () => {
            const { result } = renderHook(() => useTransaction(networkId, expected.hash), {
                wrapper,
            });

            await sleep(1000);

            const currentCall = result.current[0];
            assert.deepEqual(currentCall, expected, 'result.current');
        });
    });
});

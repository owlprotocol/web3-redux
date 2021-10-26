import { assert } from 'chai';
import Web3 from 'web3';
import ganache from 'ganache-core';

import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';

import { createStore } from '../../store';
import { Network } from '../../index';
import { sleep } from '../../test/utils';
import { useAccount } from './index';

//eslint-disable-next-line @typescript-eslint/no-var-requires
const jsdom = require('mocha-jsdom');

const networkId = '1337';

describe('account.hooks', () => {
    jsdom({ url: 'http://localhost' });

    let store: ReturnType<typeof createStore>;
    let wrapper: any;

    let web3: Web3; //Web3 loaded from store
    let accounts: string[];

    let address: string;

    before(async () => {
        const networkIdInt = parseInt(networkId);
        const provider = ganache.provider({
            networkId: networkIdInt,
        });
        //@ts-ignore
        web3 = new Web3(provider);
        accounts = await web3.eth.getAccounts();
        address = accounts[0];
    });

    beforeEach(async () => {
        store = createStore();
        store.dispatch(Network.create({ networkId, web3 }));

        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    describe('useAccount', () => {
        it('(networkId, address, sync: false)', async () => {
            const { result } = renderHook(() => useAccount(networkId, address), {
                wrapper,
            });

            const balance = await web3.eth.getBalance(address);

            await sleep(1000);

            const currentBalance = result.current?.balance;
            //const allBalances = result.all.map((x: any) => (x ? x.balance : undefined));
            assert.equal(currentBalance, balance, 'result.current');
            //console.debug(allBalances)
            //assert.deepEqual(allBalances, [undefined, balance], 'result.all');
        });
    });
});

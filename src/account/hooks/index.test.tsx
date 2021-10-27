import { assert } from 'chai';
import Web3 from 'web3';
import ganache from 'ganache-core';

import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';

import { createStore } from '../../store';
import { Network, Transaction } from '../../index';
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
        it('(networkId, address, sync: true)', async () => {
            const { result } = renderHook(() => useAccount(networkId, address, { balance: true }), {
                wrapper,
            });

            const expected1 = await web3.eth.getBalance(address);

            await sleep(1000);

            const currentBalance1 = result.current?.balance;
            const currentNonce1 = result.current?.nonce;
            assert.equal(currentBalance1, expected1, 'result.current.balance');
            assert.equal(currentNonce1, undefined, 'result.current.nonce');

            const receipt = await web3.eth.sendTransaction({ from: address, to: accounts[1], value: '1' });
            //Fetch transaction, triggering a refresh
            store.dispatch(
                Transaction.fetch({
                    networkId,
                    hash: receipt.transactionHash,
                }),
            );

            const expected2 = await web3.eth.getBalance(address);
            assert.notEqual(expected1, expected2, 'balance not changed');

            await sleep(1000);

            const currentBalance2 = result.current?.balance;
            const currentNonce2 = result.current?.nonce;
            //console.debug(result.all);
            //sync, balance updated
            assert.notEqual(currentBalance2, expected1, 'previous balance');
            assert.equal(currentBalance2, expected2, 'updated balance');
            assert.equal(currentNonce2, undefined, 'result2.current.nonce');
        });
    });
});

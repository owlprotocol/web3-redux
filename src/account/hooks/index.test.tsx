import { assert } from 'chai';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import Ganache from 'ganache-core';
import Web3 from 'web3';

import { fetch as fetchTransaction } from '../../transaction/actions';
import { create as createNetwork } from '../../network/actions';

import { name } from '../common';
import { createStore, StoreType } from '../../store';
import { create } from '../actions';
import { useByIdSingle, useByIdMany, useAccount } from '../hooks';
import Interface, { InterfacePartial, getId, Id } from '../model/interface';
import { sleep, ZERO_ADDRESS } from '../../utils';

//eslint-disable-next-line @typescript-eslint/no-var-requires
const jsdom = require('mocha-jsdom');

describe(`${name}.hooks`, () => {
    jsdom({ url: 'http://localhost' });

    let store: StoreType;
    let web3: Web3;

    const networkId = '1337';

    let item: InterfacePartial;
    let id: Id;
    let itemWithId: Interface;

    let wrapper: any;
    before(async () => {
        const provider = Ganache.provider({
            networkId: parseInt(networkId),
        });
        //@ts-ignore
        web3 = new Web3(provider);

        const accounts = await web3.eth.getAccounts();
        item = { networkId, address: accounts[0] };
        id = getId(item);
        itemWithId = { id, ...item };
    });

    beforeEach(() => {
        store = createStore();
        store.dispatch(create(item));
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    it('useByIdSingle', async () => {
        const { result } = renderHook(() => useByIdSingle(id), {
            wrapper,
        });

        assert.deepEqual(result.current, itemWithId);
        assert.equal(result.all.length, 1);
    });

    it('useByIdMany', async () => {
        const { result } = renderHook(() => useByIdMany([id]), {
            wrapper,
        });

        assert.deepEqual(result.current, [itemWithId]);
        assert.equal(result.all.length, 1);
    });

    it('useAccount', () => {
        it('(networkId, address, sync: true)', async () => {
            store.dispatch(createNetwork({ networkId, web3 }));

            const { result } = renderHook(() => useAccount(id, { balance: true }), {
                wrapper,
            });

            const expected1 = await web3.eth.getBalance(item.address!);

            await sleep(1000);

            const currentBalance1 = result.current?.balance;
            const currentNonce1 = result.current?.nonce;
            assert.equal(currentBalance1, expected1, 'result.current.balance');
            assert.equal(currentNonce1, undefined, 'result.current.nonce');

            const receipt = await web3.eth.sendTransaction({ from: item.address, to: ZERO_ADDRESS, value: '1' });
            //Fetch transaction, triggering a refresh
            store.dispatch(
                fetchTransaction({
                    networkId,
                    hash: receipt.transactionHash,
                }),
            );

            const expected2 = await web3.eth.getBalance(item.address!);
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

import { assert } from 'chai';
import Web3 from 'web3';
import ganache from 'ganache-core';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';

import { sleep } from '../../utils';
import { create as createNetwork } from '../../network/actions';

import { name } from '../common';
import { networkId } from '../../test/data';

import { createStore, StoreType } from '../../store';
import { create } from '../actions';
import { useByIdSingle, useByIdMany, useBlock } from './index';
import { BlockTransaction, BlockId, getId, validate } from '../model';

//eslint-disable-next-line @typescript-eslint/no-var-requires
const jsdom = require('mocha-jsdom');

describe(`${name}.hooks`, () => {
    jsdom({ url: 'http://localhost' });

    let store: StoreType;
    let item: BlockTransaction;
    let id: BlockId;
    let itemWithId: BlockTransaction;

    let wrapper: any;
    before(async () => {
        item = { networkId, number: 0, transactions: [] };
        id = { ...item };
        itemWithId = { id: getId(item), ...item };
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

    describe('useBlock', () => {
        let web3: Web3; //Web3 loaded from store
        let accounts: string[];
        let expected: BlockTransaction;

        before(async () => {
            const networkIdInt = parseInt(networkId);
            const provider = ganache.provider({
                networkId: networkIdInt,
            });
            //@ts-ignore
            web3 = new Web3(provider);
            accounts = await web3.eth.getAccounts();
        });

        beforeEach(async () => {
            store.dispatch(createNetwork({ networkId, web3 }));
            wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;

            const txSent = await web3.eth.sendTransaction({ from: accounts[0], to: accounts[1], value: '1' });
            const block = await web3.eth.getBlock(txSent.blockNumber);
            expected = validate({
                networkId,
                ...block,
                transactions: [{ networkId, hash: txSent.transactionHash }],
            });
        });

        it('(networkId, number)', async () => {
            const { result } = renderHook(() => useBlock(networkId, expected.number), {
                wrapper,
            });

            await sleep(1000);

            const currentCall = result.current[0];
            assert.deepEqual(currentCall, expected, 'result.current');
        });
    });
});

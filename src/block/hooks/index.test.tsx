import { assert } from 'chai';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import Ganache from 'ganache-core';
import Web3 from 'web3';

import { name } from '../common';
import { createStore, StoreType } from '../../store';
import { create } from '../actions';
import { useByIdSingle, useByIdMany } from './index';
import Interface, { InterfacePartial, getId, Id } from '../model/interface';

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
        console.debug(web3.currentProvider);

        item = { networkId, number: 0 };
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
});

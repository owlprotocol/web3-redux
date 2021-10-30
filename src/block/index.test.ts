import { assert } from 'chai';
import Web3 from 'web3';
import Ganache from 'ganache-core';

import { createStore, StoreType } from '../store';
import { create as createNetwork } from '../network/actions';

import { name } from './common';
import { selectByIdSingle } from './selectors';

import { getId, Id, InterfacePartial } from './model/interface';

import createAction from './actions/create';
import fetchAction from './actions/fetch';

describe(`${name}.integration`, () => {
    let store: StoreType;
    let web3: Web3;

    const networkId = '1337';

    let item: InterfacePartial;
    let id: Id;

    before(async () => {
        const provider = Ganache.provider({
            networkId: parseInt(networkId),
        });
        //@ts-ignore
        web3 = new Web3(provider);

        item = { networkId, number: 0 };
        id = getId(item);
    });

    beforeEach(() => {
        store = createStore();
        store.dispatch(createNetwork({ networkId, web3 }));
        store.dispatch(createAction(item));
    });

    it('fetch()', async () => {
        store.dispatch(fetchAction({ networkId, blockHashOrBlockNumber: item.number! }));
        const expected = await web3.eth.getBlock(item.number!);
        const selected = selectByIdSingle(store.getState(), id);
        assert.equal(selected?.hash, expected.hash, 'hash');
    });
});

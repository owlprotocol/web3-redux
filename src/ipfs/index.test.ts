// import { assert } from 'chai';
import { create as createAction, fetchIpfs as fetchIpfsAction } from './actions';

import { createStore, StoreType } from '../store';
import { create as createNetwork } from '../network/actions';

import { name } from './common';
import { selectByIdSingle } from './selectors';

// import moxios from 'moxios';

import { Ipfs } from './model/interface';

import { IPFS_HELLO_WORLD, sleep } from '../utils';

describe(`${name}.integration`, () => {
    let store: StoreType;

    let item: Ipfs;

    const networkId = '0';

    const contentId = IPFS_HELLO_WORLD;
    const ipfsUrl = 'https://ipfs.infura.io:5001/api/v0';

    before(() => {
        item = { networkId, contentId };
    });

    beforeEach(() => {
        store = createStore();
        store.dispatch(createNetwork({ networkId, ipfsUrl }));
        store.dispatch(createAction(item));
    });

    it('fetchIpfs()', async () => {
        store.dispatch(fetchIpfsAction(item));
        sleep(1000);
        const ipfsItem = selectByIdSingle(store.getState(), item);
        console.log(ipfsItem);
        // assert.equal(ipfsItem!.data?.toString(), 'Hello World');
    });
});

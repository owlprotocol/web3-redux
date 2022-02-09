// import { assert } from 'chai';
import { create as createAction, fetchIpfs as fetchIpfsAction } from './actions';

import { createStore, StoreType } from '../store';

import { name } from './common';
import { selectByIdMany } from './selectors';

import { Ipfs } from './model/interface';

import { IPFS_HELLO_WORLD } from '../utils';

describe(`${name}.integration`, () => {
    let store: StoreType;

    let item: Ipfs;

    const contentId = IPFS_HELLO_WORLD;

    before(() => {
        item = { contentId };
    });

    beforeEach(() => {
        ({ store } = createStore());
        store.dispatch(createAction(item));
    });

    it('fetchIpfs()', async () => {
        store.dispatch(fetchIpfsAction(item));
        await new Promise((res) => setTimeout(res, 3000));
        const ipfsItem = selectByIdMany(store.getState());
        console.log(ipfsItem);
        // assert.equal(ipfsItem!.data?.toString(), 'Hello World');
    });
});

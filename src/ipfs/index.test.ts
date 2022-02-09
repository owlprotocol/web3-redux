import { assert } from 'chai';
import { IPFS_HELLO_WORLD, sleep } from '../utils';
import { createStore, StoreType } from '../store';

import { name } from './common';
import { selectByIdSingle } from './selectors';
import { Ipfs } from './model/interface';
import { fetchIpfs as fetchIpfsAction } from './actions';

describe(`${name}.integration`, () => {
    let store: StoreType;

    let item: Ipfs;

    const contentId = IPFS_HELLO_WORLD;

    before(() => {
        item = { contentId };
    });

    beforeEach(() => {
        ({ store } = createStore());
    });

    it('fetchIpfs()', async () => {
        store.dispatch(fetchIpfsAction(item));

        await sleep(1000);
        const ipfsItem = selectByIdSingle(store.getState(), contentId);
        assert.equal(ipfsItem!.data, 'Hello World\n');
    });
});

import { assert } from 'chai';
import { sleep } from '../utils';
import { IPFS_HELLO_WORLD, IPFS_NFT_INSTANCE, IPFS_NFT_COLLECTION } from '../test/data';
import { createStore, StoreType } from '../store';

import { name } from './common';
import { selectByIdSingle } from './selectors';
import { fetchIpfs, objectGet, cat } from './actions';
import selectPathHash from './selectors/selectPathHash';

describe(`${name}.integration`, () => {
    let store: StoreType;

    beforeEach(() => {
        ({ store } = createStore());
    });

    describe('cat', () => {
        it('(IPFS_HELLO_WORLD)', async () => {
            store.dispatch(cat(IPFS_HELLO_WORLD));

            await sleep(1000);
            const ipfsItem = selectByIdSingle(store.getState(), IPFS_HELLO_WORLD);
            assert.isUndefined(ipfsItem?.pbNode?.Data, 'pbNode.Data');
            assert.isUndefined(ipfsItem?.pbNode?.Links, 'pbNode.Links');
            assert.isUndefined(ipfsItem?.linksByName, 'linkByName');
            assert.equal(ipfsItem?.data, 'Hello World\n');
        });

        it('(IPFS_NFT_INSTANCE)', async () => {
            store.dispatch(cat(IPFS_NFT_INSTANCE));

            await sleep(1000);
            const ipfsItem = selectByIdSingle(store.getState(), IPFS_NFT_INSTANCE);
            assert.equal(ipfsItem?.data.name, '52 Hertz');
        });
    });

    describe('objectGet', () => {
        it('(IPFS_HELLO_WORLD)', async () => {
            store.dispatch(objectGet(IPFS_HELLO_WORLD));

            await sleep(1000);
            const ipfsItem = selectByIdSingle(store.getState(), IPFS_HELLO_WORLD);
            assert.isDefined(ipfsItem?.pbNode?.Data, 'pbNode.Data');
            assert.isDefined(ipfsItem?.pbNode?.Links, 'pbNode.Links');
            assert.isDefined(ipfsItem?.linksByName, 'linkByName');
            assert.isUndefined(ipfsItem?.data, 'data');
        });
    });

    describe('fetchIpfs', () => {
        it('(IPFS_HELLO_WORLD)', async () => {
            //Recurse path, getObject, cat final hash
            store.dispatch(fetchIpfs(IPFS_HELLO_WORLD));

            await sleep(1000);
            const ipfsItem = selectByIdSingle(store.getState(), IPFS_HELLO_WORLD);
            assert.isDefined(ipfsItem?.pbNode?.Data, 'pbNode.Data');
            assert.isDefined(ipfsItem?.pbNode?.Links, 'pbNode.Links');
            assert.isDefined(ipfsItem?.linksByName, 'linkByName');
            assert.equal(ipfsItem?.data, 'Hello World\n');
        });

        it('(IPFS_NFT_COLLECTION/1.json)', async () => {
            //Recurse path, getObject, cat final hash
            const ipfsPath = `${IPFS_NFT_COLLECTION}/1.json`;
            const childHash = 'QmZyAnXBwWSheQQxNZ8kCECkQHCYc79F9XJuMZXwibZeCZ';
            store.dispatch(fetchIpfs(`${ipfsPath}`));

            await sleep(2000);
            const ipfsItem = selectByIdSingle(store.getState(), childHash);
            assert.isDefined(ipfsItem?.pbNode?.Data, 'pbNode.Data');
            assert.isDefined(ipfsItem?.pbNode?.Links, 'pbNode.Links');
            assert.isDefined(ipfsItem?.linksByName, 'linkByName');
            assert.equal(ipfsItem?.data.name, 'Test NFT 1');

            const selectedHash = selectPathHash(store.getState(), ipfsPath);
            assert.equal(selectedHash, childHash, 'Path does not resolve!');
        });
    });
});

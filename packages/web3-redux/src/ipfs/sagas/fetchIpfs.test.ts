import { assert } from 'chai';
import { testSaga } from 'redux-saga-test-plan';
import * as IPFS from 'ipfs-http-client';
import { Mockttp } from 'mockttp';

import { fetchIpfs } from './fetchIpfs.js';
import { objectGet } from './objectGet.js';
import { IPFS_HELLO_WORLD, IPFS_NFT_COLLECTION, IPFS_NFT_1, startMockIPFSNode } from '../../test/data.js';
import { sleep } from '../../utils/index.js';

import { createStore, StoreType } from '../../store.js';
import { update as updateConfig } from '../../config/actions/index.js';
import { selectByIdSingle, selectPathHash } from '../selectors/index.js';
import { fetchIpfs as fetchIpfsAction, objectGet as objectGetAction, cat as catAction } from '../actions/index.js';

describe('ipfs/sagas/fetchIpfs.test.ts', () => {
    let client: IPFS.IPFSHTTPClient;
    let mockIPFSNode: Mockttp;

    before(async () => {
        mockIPFSNode = await startMockIPFSNode();
        client = IPFS.create({ url: mockIPFSNode.url });
    });

    after(() => mockIPFSNode.stop());

    it('testSaga()', async () => {
        const cid = IPFS_HELLO_WORLD;

        testSaga(fetchIpfs, fetchIpfsAction(cid))
            .next()
            .select(selectByIdSingle, cid) //Check if exists
            .next(undefined)
            .call(objectGet, objectGetAction(cid)) //Get object
            .next()
            .put(catAction(cid)) //Get cat data
            .next();
    });
    describe('integration', () => {
        let store: StoreType;

        beforeEach(() => {
            ({ store } = createStore());
            store.dispatch(updateConfig({ id: '0', ipfsClient: client }));
        });

        it('fetchIpfs(IPFS_HELLO_WORLD)', async () => {
            store.dispatch(fetchIpfsAction(IPFS_HELLO_WORLD));

            await sleep(100);
            const ipfsItem = selectByIdSingle(store.getState(), IPFS_HELLO_WORLD);
            assert.isDefined(ipfsItem?.pbNode?.Data, 'pbNode.Data');
            assert.isDefined(ipfsItem?.pbNode?.Links, 'pbNode.Links');
            assert.isDefined(ipfsItem?.linksByName, 'linkByName');
            assert.equal(ipfsItem?.data, 'Hello World\n');
        });

        it('fetchIpfs(IPFS_NFT_1)', async () => {
            //Recurse path, getObject, cat final hash
            const ipfsPath = `${IPFS_NFT_COLLECTION}/1`;
            const childHash = IPFS_NFT_1;
            store.dispatch(fetchIpfsAction(ipfsPath));

            await sleep(100);
            const ipfsItem = selectByIdSingle(store.getState(), childHash);
            assert.equal(ipfsItem?.data.name, 'Test NFT 1');

            const selectedHash = selectPathHash(store.getState(), ipfsPath);
            assert.equal(selectedHash, childHash, 'Path does not resolve!');
        });
    });
});

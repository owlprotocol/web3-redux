import { assert } from 'chai';
import { testSaga } from 'redux-saga-test-plan';
import { create as createIPFSClient } from 'ipfs-http-client';
import { Mockttp } from 'mockttp';

import { cat } from './cat.js';
import { IPFS_HELLO_WORLD, IPFS_NFT_1, startMockIPFSNode } from '../../test/data.js';
import { sleep } from '../../utils/index.js';

import { createStore, StoreType } from '../../store.js';
import { update as updateConfig } from '../../config/actions/index.js';
import { selectByIdSingle } from '../selectors/index.js';
import { selectConfig } from '../../config/selectors/index.js';
import { create as createAction, set as setAction, cat as catAction } from '../actions/index.js';

describe('ipfs/sagas/cat.test.ts', () => {
    let client: ReturnType<typeof createIPFSClient>;
    let mockIPFSNode: Mockttp;

    before(async () => {
        mockIPFSNode = await startMockIPFSNode();
        client = createIPFSClient({ url: mockIPFSNode.url });
    });

    after(() => mockIPFSNode.stop());

    it('testSaga()', async () => {
        const cid = IPFS_HELLO_WORLD;
        const encoder = new TextEncoder();

        testSaga(cat, catAction(cid))
            .next()
            .select(selectConfig)
            .next({ ipfsClient: client })
            .select(selectByIdSingle, cid) //Check if exists
            .next(undefined)
            .put(createAction({ contentId: cid })) //Create with contentId
            .next()
            .next(encoder.encode('Hello World\n')) //cat + concat generator
            .put(setAction({ contentId: cid, key: 'data', value: 'Hello World\n' }))
            .next();
    });
    describe('integration', () => {
        let store: StoreType;

        beforeEach(() => {
            ({ store } = createStore());
            store.dispatch(updateConfig({ id: '0', ipfsClient: client }));
        });

        it('cat(IPFS_HELLO_WORLD)', async () => {
            store.dispatch(catAction(IPFS_HELLO_WORLD));

            await sleep(100);
            const ipfsItem = selectByIdSingle(store.getState(), IPFS_HELLO_WORLD);
            assert.isUndefined(ipfsItem?.pbNode?.Data, 'pbNode.Data');
            assert.isUndefined(ipfsItem?.pbNode?.Links, 'pbNode.Links');
            assert.isUndefined(ipfsItem?.linksByName, 'linkByName');
            assert.equal(ipfsItem?.data, 'Hello World\n');
        });

        it('cat(IPFS_NFT_1)', async () => {
            store.dispatch(catAction(IPFS_NFT_1));

            await sleep(100);
            const ipfsItem = selectByIdSingle(store.getState(), IPFS_NFT_1);
            assert.equal(ipfsItem?.data.name, 'Test NFT 1');
        });
    });
});

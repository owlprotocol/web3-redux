import { assert } from 'chai';
import { testSaga } from 'redux-saga-test-plan';
import * as IPFS from 'ipfs-http-client';
import { Mockttp } from 'mockttp';
import { objectGet } from './objectGet.js';
import { IPFS_HELLO_WORLD, startMockIPFSNode } from '../../test/data.js';
import { sleep } from '../../utils/index.js';

import { createStore, StoreType } from '../../store.js';
import { update as updateConfig } from '../../config/actions/index.js';
import { selectByIdSingle } from '../selectors/index.js';
import { create as createAction, objectGet as objectGetAction } from '../actions/index.js';

import { selectConfig } from '../../config/selectors/index.js';

describe('ipfs/sagas/objectGet.test.ts', () => {
    let client: IPFS.IPFSHTTPClient;
    let mockIPFSNode: Mockttp;

    before(async () => {
        mockIPFSNode = await startMockIPFSNode();
        client = IPFS.create({ url: mockIPFSNode.url });
    });

    after(() => mockIPFSNode.stop());

    it('testSaga()', async () => {
        const cid = IPFS_HELLO_WORLD;

        testSaga(objectGet, objectGetAction(cid))
            .next()
            .select(selectConfig)
            .next({ ipfsClient: client })
            .select(selectByIdSingle, cid) //Check if exists
            .next(undefined)
            .put(createAction({ contentId: cid })) //Create with contentId
            .next();
    });

    describe('integration', () => {
        let store: StoreType;

        beforeEach(() => {
            ({ store } = createStore());
            store.dispatch(updateConfig({ id: '0', ipfsClient: client }));
        });

        it('objectGet(IPFS_HELLO_WORLD)', async () => {
            store.dispatch(objectGetAction(IPFS_HELLO_WORLD));

            await sleep(100);
            const ipfsItem = selectByIdSingle(store.getState(), IPFS_HELLO_WORLD);
            assert.isDefined(ipfsItem?.pbNode?.Data, 'pbNode.Data');
            assert.isDefined(ipfsItem?.pbNode?.Links, 'pbNode.Links');
            assert.isDefined(ipfsItem?.linksByName, 'linkByName');
            assert.isUndefined(ipfsItem?.data, 'data');
        });
    });
});

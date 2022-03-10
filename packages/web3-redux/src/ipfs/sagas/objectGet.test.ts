import { assert } from 'chai';
import { testSaga } from 'redux-saga-test-plan';
import * as IPFS from 'ipfs-http-client';
import { Mockttp } from 'mockttp';
import { objectGet } from './objectGet';
import { IPFS_HELLO_WORLD, startMockIPFSNode } from '../../test/data';
import { sleep } from '../../utils';

import { createStore, StoreType } from '../../store';
import { update as updateConfig } from '../../config/actions';
import { selectByIdSingle } from '../selectors';
import { create as createAction, objectGet as objectGetAction } from '../actions';

import { selectConfig } from '../../config/selectors';

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

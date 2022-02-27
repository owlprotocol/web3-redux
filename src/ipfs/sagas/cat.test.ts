import { assert } from 'chai';
import { testSaga } from 'redux-saga-test-plan';
import * as IPFS from 'ipfs-http-client';
import * as MockHTTP from 'mockttp';

import { IPFS_HELLO_WORLD, IPFS_NFT_COLLECTION_1 } from '../../test/data';
import { sleep } from '../../utils';

import { createStore, StoreType } from '../../store';
import { update as updateConfig } from '../../config/actions';
import { selectByIdSingle } from '../selectors';
import { selectConfig } from '../../config/selectors';
import { create as createAction, set as setAction, cat as catAction } from '../actions';

import cat from './cat';

describe('ipfs/sagas/cat.test.ts', () => {
    const mockNode = MockHTTP.getLocal();
    let client: IPFS.IPFSHTTPClient;

    before(async () => {
        await mockNode.start();
        client = IPFS.create({ url: mockNode.url });

        await mockNode
            .forPost(`${mockNode.url}/api/v0/cat`)
            .withQuery({ arg: IPFS_HELLO_WORLD })
            .thenReply(200, 'Hello World\n');
        await mockNode
            .forPost(`${mockNode.url}/api/v0/cat`)
            .withQuery({ arg: IPFS_NFT_COLLECTION_1 })
            .thenReply(
                200,
                JSON.stringify({
                    title: 'Test NFT 1',
                    name: 'Test NFT 1',
                    type: 'object',
                    description: 'collection/1',
                    attributes: [
                        {
                            trait_type: 'Creator',
                            value: 'Leo Vigna',
                        },
                    ],
                }),
                { 'content-type': 'application/json' },
            );
    });

    after(() => mockNode.stop());

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

        it('cat(IPFS_NFT_COLLECTION_1)', async () => {
            store.dispatch(catAction(IPFS_NFT_COLLECTION_1));

            await sleep(100);
            const ipfsItem = selectByIdSingle(store.getState(), IPFS_NFT_COLLECTION_1);
            assert.equal(ipfsItem?.data.name, 'Test NFT 1');
        });
    });
});

import { assert } from 'chai';
import { testSaga } from 'redux-saga-test-plan';
import * as IPFS from 'ipfs-http-client';
import * as MockHTTP from 'mockttp';

import { IPFS_HELLO_WORLD, IPFS_NFT_COLLECTION, IPFS_NFT_COLLECTION_1 } from '../../test/data';
import { sleep } from '../../utils';

import { createStore, StoreType } from '../../store';
import { update as updateConfig } from '../../config/actions';
import { selectByIdSingle, selectPathHash } from '../selectors';
import { fetchIpfs as fetchIpfsAction, objectGet as objectGetAction, cat as catAction } from '../actions';

import fetchIpfs from './fetchIpfs';
import objectGet from './objectGet';

describe('ipfs/sagas/fetchIpfs.test.ts', () => {
    const mockNode = MockHTTP.getLocal();
    let client: IPFS.IPFSHTTPClient;
    const dagNodeHelloWorld = { Data: Buffer.from('Hello World\n').toString('base64'), Links: [] };
    const nftCollection1 = {
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
    };
    const dagNodeCollection = {
        Data: Buffer.from([]).toString('base64'),
        Links: [
            {
                Hash: IPFS_NFT_COLLECTION_1,
                Name: '1',
            },
        ],
    };
    const dagNodeCollection1 = { Data: Buffer.from(JSON.stringify(nftCollection1)).toString('base64'), Links: [] };

    before(async () => {
        await mockNode.start();
        client = IPFS.create({ url: mockNode.url });

        await mockNode
            .forPost(`${mockNode.url}/api/v0/object/get`)
            .withQuery({ arg: IPFS_HELLO_WORLD })
            .thenReply(200, JSON.stringify(dagNodeHelloWorld));
        await mockNode
            .forPost(`${mockNode.url}/api/v0/object/get`)
            .withQuery({ arg: IPFS_NFT_COLLECTION })
            .thenReply(200, JSON.stringify(dagNodeCollection));
        await mockNode
            .forPost(`${mockNode.url}/api/v0/object/get`)
            .withQuery({ arg: IPFS_NFT_COLLECTION_1 })
            .thenReply(200, JSON.stringify(dagNodeCollection1));

        await mockNode
            .forPost(`${mockNode.url}/api/v0/cat`)
            .withQuery({ arg: IPFS_HELLO_WORLD })
            .thenReply(200, 'Hello World\n');
        await mockNode
            .forPost(`${mockNode.url}/api/v0/cat`)
            .withQuery({ arg: IPFS_NFT_COLLECTION_1 })
            .thenReply(200, JSON.stringify(nftCollection1), { 'content-type': 'applifetchIpfsion/json' });
    });

    after(() => mockNode.stop());

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

        it('fetchIpfs(IPFS_NFT_COLLECTION_1)', async () => {
            //Recurse path, getObject, cat final hash
            const ipfsPath = `${IPFS_NFT_COLLECTION}/1`;
            const childHash = IPFS_NFT_COLLECTION_1;
            store.dispatch(fetchIpfsAction(ipfsPath));

            await sleep(100);
            const ipfsItem = selectByIdSingle(store.getState(), childHash);
            assert.equal(ipfsItem?.data.name, 'Test NFT 1');

            const selectedHash = selectPathHash(store.getState(), ipfsPath);
            assert.equal(selectedHash, childHash, 'Path does not resolve!');
        });
    });
});

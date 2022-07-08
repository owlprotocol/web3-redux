//@ts-nocheck
import { assert } from 'chai';
import { testSaga } from 'redux-saga-test-plan';
import axios from 'axios';
import * as moxios from 'moxios';
import { fetchIpfs } from './fetchIpfs.js';
import { objectGet } from './objectGet.js';
import {
    HELLO_WORLD_QMHASH,
    NFT_COLLECTION_QMHASH,
    NFT_0_QMHASH,
    moxiosIPFS,
    HELLO_WORLD,
    NFT_0,
} from '../../test/ipfs.js';

import { createStore, StoreType } from '../../store.js';

import { selectByIdSingle, selectPathHash } from '../selectors/index.js';
import { fetchIpfs as fetchIpfsAction, objectGet as objectGetAction, cat as catAction } from '../actions/index.js';

describe('ipfs/sagas/fetchIpfs.test.ts', () => {
    before(() => moxios.install(axios));
    after(() => moxios.uninstall(axios));

    it('testSaga()', async () => {
        const cid = HELLO_WORLD_QMHASH;

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
            store.dispatch(ConfigCRUD.actions.update({ id: '0', ipfsClient: axios }));
        });

        it('fetchIpfs(IPFS_HELLO_WORLD)', async () => {
            store.dispatch(fetchIpfsAction(HELLO_WORLD_QMHASH));

            await moxiosIPFS();
            await moxiosIPFS();
            const ipfsItem = selectByIdSingle(store.getState(), HELLO_WORLD_QMHASH);
            assert.isDefined(ipfsItem?.pbNode?.Data, 'pbNode.Data');
            assert.isDefined(ipfsItem?.pbNode?.Links, 'pbNode.Links');
            assert.isDefined(ipfsItem?.linksByName, 'linkByName');
            assert.equal(ipfsItem?.data, HELLO_WORLD);
        });

        it('fetchIpfs(IPFS_NFT_1)', async () => {
            //Recurse path, getObject, cat final hash
            const ipfsPath = `${NFT_COLLECTION_QMHASH}/0`;
            const childHash = NFT_0_QMHASH;
            store.dispatch(fetchIpfsAction(ipfsPath));

            await moxiosIPFS();
            await moxiosIPFS();
            await moxiosIPFS();
            const ipfsItem = selectByIdSingle(store.getState(), childHash);
            assert.equal(ipfsItem?.data.name, NFT_0.name);

            const selectedHash = selectPathHash(store.getState(), ipfsPath);
            assert.equal(selectedHash, childHash, 'Path does not resolve!');
        });
    });
});

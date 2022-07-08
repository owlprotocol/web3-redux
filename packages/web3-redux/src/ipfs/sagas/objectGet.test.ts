import { assert } from 'chai';
import { testSaga } from 'redux-saga-test-plan';
import axios from 'axios';
import * as moxios from 'moxios';

import { objectGet } from './objectGet.js';
import { HELLO_WORLD_QMHASH, moxiosIPFS } from '../../test/ipfs.js';

import { createStore, StoreType } from '../../store.js';

import { objectGet as objectGetAction } from '../actions/index.js';

import ConfigCRUD from '../../config/crud.js';
import IPFSCacheCRUD from '../crud.js';

describe('ipfs/sagas/objectGet.test.ts', () => {
    before(() => moxios.install(axios));
    after(() => moxios.uninstall(axios));

    it('testSaga()', async () => {
        const cid = HELLO_WORLD_QMHASH;

        testSaga(objectGet, objectGetAction(cid))
            .next()
            .select(ConfigCRUD.selectors.selectByIdSingle, { id: '0' })
            .next({ ipfsClient: axios })
            .select(IPFSCacheCRUD.db.get, cid) //Check if exists
            .next(undefined)
            .put(IPFSCacheCRUD.actions.create({ contentId: cid })) //Create with contentId
            .next();
    });

    describe('integration', () => {
        let store: StoreType;

        beforeEach(() => {
            ({ store } = createStore());
            store.dispatch(ConfigCRUD.actions.update({ id: '0', ipfsClient: axios }));
        });

        it('objectGet(IPFS_HELLO_WORLD)', async () => {
            store.dispatch(objectGetAction(HELLO_WORLD_QMHASH));

            await moxiosIPFS();

            const ipfsItem = await IPFSCacheCRUD.db.get(HELLO_WORLD_QMHASH);
            assert.isDefined(ipfsItem?.pbNode?.Data, 'pbNode.Data');
            assert.isDefined(ipfsItem?.pbNode?.Links, 'pbNode.Links');
            assert.isDefined(ipfsItem?.linksByName, 'linkByName');
            assert.isUndefined(ipfsItem?.data, 'data');
        });
    });
});

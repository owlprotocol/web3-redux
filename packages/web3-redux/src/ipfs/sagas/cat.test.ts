import { assert } from 'chai';
import { testSaga } from 'redux-saga-test-plan';
import axios from 'axios';
import * as moxios from 'moxios';

import { cat } from './cat.js';
import { HELLO_WORLD_QMHASH, HELLO_WORLD, NFT_0_QMHASH, moxiosIPFS, NFT_0 } from '../../test/ipfs.js';

import { createStore, StoreType } from '../../store.js';
import { update as updateConfig } from '../../config/actions/index.js';
import { selectByIdSingle } from '../selectors/index.js';
import { selectConfig } from '../../config/selectors/index.js';
import { create as createAction, set as setAction, cat as catAction } from '../actions/index.js';

describe('ipfs/sagas/cat.test.ts', () => {
    before(() => moxios.install(axios));
    after(() => moxios.uninstall(axios));

    it('testSaga()', async () => {
        const cid = HELLO_WORLD_QMHASH;
        testSaga(cat, catAction(cid))
            .next()
            .select(selectConfig)
            .next({ ipfsClient: axios })
            .select(selectByIdSingle, cid) //Check if exists
            .next(undefined)
            .put(createAction({ contentId: cid })) //Create with contentId
            .next()
            .call(axios.post, '/api/v0/cat', { arg: cid })
            .next({ data: HELLO_WORLD })
            .put(setAction({ contentId: cid, key: 'data', value: HELLO_WORLD }))
            .next();
    });
    describe('integration', () => {
        let store: StoreType;

        beforeEach(() => {
            ({ store } = createStore());
            store.dispatch(updateConfig({ id: '0', ipfsClient: axios }));
        });

        it('cat(IPFS_HELLO_WORLD)', async () => {
            store.dispatch(catAction(HELLO_WORLD_QMHASH));

            await moxiosIPFS();
            const ipfsItem = selectByIdSingle(store.getState(), HELLO_WORLD_QMHASH);
            assert.isUndefined(ipfsItem?.pbNode?.Data, 'pbNode.Data');
            assert.isUndefined(ipfsItem?.pbNode?.Links, 'pbNode.Links');
            assert.isUndefined(ipfsItem?.linksByName, 'linkByName');
            assert.equal(ipfsItem?.data, HELLO_WORLD);
        });

        it('cat(IPFS_NFT_1)', async () => {
            store.dispatch(catAction(NFT_0_QMHASH));

            await moxiosIPFS();
            const ipfsItem = selectByIdSingle(store.getState(), NFT_0_QMHASH);
            assert.equal(ipfsItem?.data.name, NFT_0.name);
        });
    });
});

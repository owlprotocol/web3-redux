import { assert } from 'chai';
import { testSaga } from 'redux-saga-test-plan';
import * as IPFS from 'ipfs-http-client';
import * as MockHTTP from 'mockttp';
import { IPFS_HELLO_WORLD } from '../../test/data';
import { sleep } from '../../utils';

import { createStore, StoreType } from '../../store';
import { update as updateConfig } from '../../config/actions';
import { selectByIdSingle } from '../selectors';
import { create as createAction, objectGet as objectGetAction } from '../actions';

import objectGet from './objectGet';
import { selectConfig } from '../../config/selectors';

describe('ipfs/sagas/objectGet.test.ts', () => {
    const mockNode = MockHTTP.getLocal();
    let client: IPFS.IPFSHTTPClient;
    const dagNode = { Data: Buffer.from('Hello World\n').toString('base64'), Links: [] };

    before(async () => {
        await mockNode.start();
        client = IPFS.create({ url: mockNode.url });

        await mockNode
            .forPost(`${mockNode.url}/api/v0/object/get`)
            .withQuery({ arg: IPFS_HELLO_WORLD })
            .thenReply(200, JSON.stringify(dagNode));
    });

    after(() => mockNode.stop());

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

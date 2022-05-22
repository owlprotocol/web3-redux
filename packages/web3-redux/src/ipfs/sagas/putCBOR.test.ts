//import { assert } from 'chai';
import { testSaga } from 'redux-saga-test-plan';
import { putCBOR } from './putCBOR.js';
import { createStore, StoreType } from '../../store.js';
import { putCBOR as putCBORAction } from '../actions/index.js';

import { IPFSSingleton } from '../IPFSSingleton.js';
import { Environment } from '../../index.js';

describe('ipfs/sagas/putCBOR.test.ts', () => {
    const payload = { message: 'Hello World Test!' };

    before(() => {
        const url = Environment.IPFS_URL();
        //console.debug({ url });
        IPFSSingleton.setIPFS(url);
    });

    it.skip('testSaga()', async () => {
        testSaga(putCBOR, putCBORAction(payload)).next().call(IPFSSingleton.putCBOR, payload).next();
    });

    describe('integration', () => {
        let store: StoreType;

        beforeEach(() => {
            ({ store } = createStore());
        });

        it('putCBOR({message})', async () => {
            store.dispatch(putCBORAction(payload));

            /*
            const ipfsItem = selectByIdSingle(store.getState(), HELLO_WORLD_QMHASH);
            assert.isDefined(ipfsItem?.pbNode?.Data, 'pbNode.Data');
            assert.isDefined(ipfsItem?.pbNode?.Links, 'pbNode.Links');
            assert.isDefined(ipfsItem?.linksByName, 'linkByName');
            assert.isUndefined(ipfsItem?.data, 'data');
            */
        });
    });
});

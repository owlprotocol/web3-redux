//import { assert } from 'chai';
import { testSaga } from 'redux-saga-test-plan';
import { create as createIPFS, IPFS } from 'ipfs';
import { assert } from 'chai';
import { code as codeCBOR, encode as encodeCBOR } from '@ipld/dag-cbor';
import { CID } from 'multiformats';
import { sha256 } from 'multiformats/hashes/sha2';
import { existsSync, rmSync } from 'fs';
import { putCBOR } from './putCBOR.js';
import { createStore, StoreType } from '../../store.js';
import { putCBOR as putCBORAction } from '../actions/index.js';

import { IPFSSingleton } from '../IPFSSingleton.js';
import { selectByIdSingle } from '../selectors/index.js';
import { HELLO_WORLD_QMHASH } from '../../test/ipfs.js';
import sleep from '../../utils/sleep.js';

describe('ipfs/sagas/putCBOR.test.ts', () => {
    const payload = { message: 'Hello World Test!' };

    let ipfs: IPFS;
    beforeEach(async () => {
        ['./ipfs'].map((p) => {
            if (existsSync(p)) rmSync(p, { recursive: true });
        });

        //Write data to docs database
        ipfs = await createIPFS({
            repo: './ipfs',
        });
        IPFSSingleton.setIPFS(ipfs);
        IPFSSingleton._totalNetworkGet = 0;
        IPFSSingleton._totalNetworkPut = 0;
    });

    afterEach(async () => {
        await ipfs.stop();
        ['./ipfs'].map((p) => {
            if (existsSync(p)) rmSync(p, { recursive: true });
        });
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
            const data = encodeCBOR(payload);
            const digest = await sha256.digest(data);
            const cid = CID.create(1, codeCBOR, digest as any);

            store.dispatch(putCBORAction(payload));

            await sleep(1000);

            const ipfsItem = selectByIdSingle(store.getState(), cid.toString());
            assert.isDefined(ipfsItem?.data, 'data undefined');
            assert.deepEqual(ipfsItem?.data, payload, 'data != expected');
        });
    });
});

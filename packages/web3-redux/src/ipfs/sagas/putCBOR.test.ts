//import { assert } from 'chai';
import { testSaga } from 'redux-saga-test-plan';
import { create as createIPFS, IPFS } from 'ipfs';
import { assert } from 'chai';
import { code as codeCBOR, encode as encodeCBOR } from '@ipld/dag-cbor';
import { CID } from 'multiformats';
import { sha256 } from 'multiformats/hashes/sha2';
import { importer } from 'ipfs-unixfs-importer';
import { exporter } from 'ipfs-unixfs-exporter';
import { MemoryBlockstore } from 'blockstore-core/memory';
import { existsSync, rmSync } from 'fs';
import { putCBOR } from './putCBOR.js';
import { createStore, StoreType } from '../../store.js';
import { putCBOR as putCBORAction } from '../actions/index.js';

import { IPFSSingleton } from '../IPFSSingleton.js';
import sleep from '../../utils/sleep.js';
import IPFSCacheCRUD from '../crud.js';

//https://bafybeic3ui4dj5dzsvqeiqbxjgg3fjmfmiinb3iyd2trixj2voe4jtefgq.ipfs.dweb.link/metadata.json
//https://bafybeihhii26gwp4w7b7w7d57nuuqeexau4pnnhrmckikaukjuei2dl3fq.ipfs.dweb.link/ticket.txt
//https://cloudinary.com/

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

            const ipfsItem = IPFSCacheCRUD.selectors.selectByIdSingle(store.getState(), cid.toString());
            assert.isDefined(ipfsItem?.data, 'data undefined');
            assert.deepEqual(ipfsItem?.data, payload, 'data != expected');
        });

        it('add(hello.txt)', async () => {
            const encoder = new TextEncoder();
            const decoder = new TextDecoder();

            //add to IPFS
            const content = encoder.encode(JSON.stringify(payload)); //encodeCBOR(payload);
            const files = [{ path: '/1', content }];
            const results = [];
            for await (const result of ipfs.addAll(files, { wrapWithDirectory: true })) {
                results.push(result);
            }
            const root = results.find((r) => r.path === '');

            //Import to local blockstore
            const blockstore = new MemoryBlockstore();
            const files2 = [];
            const data2 = await ipfs.cat(`${root?.cid.toString()}/1`);
            for await (const file of importer(
                [
                    {
                        content: data2,
                    },
                ],
                blockstore,
            )) {
                files2.push(file);
            }

            const decoded1 = JSON.parse(decoder.decode(files2[0].unixfs?.data));
            console.debug(decoded1);

            //Export from local blockstore
            const entry = await exporter(files2[0].cid, blockstore);
            /*
            for await (const f of entry.content()) {
                console.debug(f);
            }
            //@ts-ignore
            console.debug(entry.unixfs.data);
            */
            //@ts-ignore
            const decoded2 = JSON.parse(decoder.decode(entry.unixfs.data));
            console.debug(decoded2);

            //Future logic
            /**
             * Check local blockstore
             * If not fetch from network + add to blockstore
             * If exists load from blockstore
             */
        });
    });
});

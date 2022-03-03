import { assert } from 'chai';
// eslint-disable-next-line prettier/prettier
import { Provider } from 'react-redux';
import * as IPFS from 'ipfs-http-client';
import { Mockttp } from 'mockttp';
import { renderHook } from '@testing-library/react-hooks';

import { expectThrowsAsync } from '../../test';
import { IPFS_HELLO_WORLD, IPFS_NFT_COLLECTION, startMockIPFSNode } from '../../test/data';

import { createStore, StoreType } from '../../store';
import { update as updateConfig } from '../../config/actions';

import useIpfs from './useIpfs';

//eslint-disable-next-line @typescript-eslint/no-var-requires
const jsdom = require('mocha-jsdom');

describe('ipfs/hooks/useIpfs.test.tsx', () => {
    jsdom({ url: 'http://localhost' });

    let store: StoreType;
    let wrapper: any;
    let client: IPFS.IPFSHTTPClient;
    let mockIPFSNode: Mockttp;
    before(async () => {
        mockIPFSNode = await startMockIPFSNode();
        client = IPFS.create({ url: mockIPFSNode.url });
    });

    after(() => mockIPFSNode.stop());

    beforeEach(async () => {
        ({ store } = createStore());
        store.dispatch(updateConfig({ id: '0', ipfsClient: client }));
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    describe('useIpfs()', async () => {
        it('default - Hello World', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useIpfs(IPFS_HELLO_WORLD), {
                wrapper,
            });

            //Two synchronous renders for null, create IPFS contentId
            assert.equal(result.all.length, 2, 'result.all.length');
            await waitForNextUpdate(); //update object data
            await waitForNextUpdate(); //update cat data
            assert.equal(result.all.length, 4, 'result.all.length');

            const value = result.current?.data;
            assert.deepEqual(value, 'Hello World\n', 'content');
            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });

        it('default - NFT', async () => {
            const ipfsPath = `${IPFS_NFT_COLLECTION}/1`;
            const { result, waitForNextUpdate } = renderHook(() => useIpfs(ipfsPath), {
                wrapper,
            });

            assert.equal(result.all.length, 1, 'result.all.length');
            await waitForNextUpdate(); //update object data root
            await waitForNextUpdate(); //update object data root/1
            await waitForNextUpdate(); //update cat data
            assert.equal(result.all.length, 4, 'result.all.length');

            const value = result.current?.data;
            assert.equal(value.name, 'Test NFT 1', 'content');
            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
    });
});

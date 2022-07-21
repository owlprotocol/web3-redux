import { assert } from 'chai';
// eslint-disable-next-line prettier/prettier
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import * as moxios from 'moxios';

import { useIpfs } from './useIpfs.js';
import { expectThrowsAsync } from '../../test/index.js';
import { HELLO_WORLD, HELLO_WORLD_QMHASH, NFT_COLLECTION_QMHASH, moxiosIPFS, NFT_0 } from '../../test/ipfs.js';

import { createStore, StoreType } from '../../store.js';
import ConfigCRUD from '../../config/crud.js';

describe('ipfs/hooks/useIpfs.test.tsx', () => {
    let store: StoreType;
    let wrapper: any;
    before(() => moxios.install(axios));
    after(() => moxios.uninstall(axios));

    beforeEach(async () => {
        store = createStore();
        store.dispatch(ConfigCRUD.actions.update({ id: '0' }));
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    describe('useIpfs()', async () => {
        it('default - Hello World', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useIpfs(HELLO_WORLD_QMHASH), {
                wrapper,
            });

            //Two synchronous renders for null, create IPFS contentId
            assert.equal(result.all.length, 2, 'result.all.length');
            //await waitForNextUpdate(); //update object data
            //await waitForNextUpdate(); //update cat data
            await moxiosIPFS();
            await moxiosIPFS();
            assert.equal(result.all.length, 4, 'result.all.length');

            const value = result.current?.data;
            assert.deepEqual(value, HELLO_WORLD, 'content');
            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });

        it('default - NFT', async () => {
            const ipfsPath = `${NFT_COLLECTION_QMHASH}/0`;
            const { result, waitForNextUpdate } = renderHook(() => useIpfs(ipfsPath), {
                wrapper,
            });

            assert.equal(result.all.length, 1, 'result.all.length');
            //await waitForNextUpdate(); //update object data root
            //await waitForNextUpdate(); //update object data root/1
            //await waitForNextUpdate(); //update cat data
            await moxiosIPFS();
            await moxiosIPFS();
            await moxiosIPFS();
            assert.equal(result.all.length, 4, 'result.all.length');

            const value = result.current?.data;
            assert.equal(value.name, NFT_0.name, 'content');
            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
    });
});

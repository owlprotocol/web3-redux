import { assert } from 'chai';
// eslint-disable-next-line prettier/prettier
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { expectThrowsAsync } from '../../test';
import { IPFS_HELLO_WORLD, IPFS_NFT_COLLECTION } from '../../test/data';

import { name } from '../common';
import { createStore, StoreType } from '../../store';

import useIpfs from './useIpfs';

//eslint-disable-next-line @typescript-eslint/no-var-requires
const jsdom = require('mocha-jsdom');

describe(`${name}/hooks/useIpfs.test.tsx`, () => {
    jsdom({ url: 'http://localhost' });

    let store: StoreType;
    let wrapper: any;

    beforeEach(async () => {
        ({ store } = createStore());
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    describe('useIpfs()', async () => {
        it('default - Hello World', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useIpfs(IPFS_HELLO_WORLD), {
                wrapper,
            });

            //Two synchronous renders for null, create IPFS contentId
            assert.equal(result.all.length, 2, 'result.all.length');
            await waitForNextUpdate(); //update data
            assert.equal(result.all.length, 3, 'result.all.length');

            const value = result.current;
            assert.deepEqual(value, 'Hello World\n', 'content');
            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });

        it('default - NFT', async () => {
            const ipfsPath = `${IPFS_NFT_COLLECTION}/1.json`;
            const { result, waitForNextUpdate } = renderHook(() => useIpfs(ipfsPath), {
                wrapper,
            });

            //Two synchronous renders for null, create IPFS contentId
            assert.equal(result.all.length, 2, 'result.all.length');
            await waitForNextUpdate(); //update data
            assert.equal(result.all.length, 3, 'result.all.length');

            const value = result.current;
            assert.equal(value.title, '52 Hertz', 'content');
            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
    });
});

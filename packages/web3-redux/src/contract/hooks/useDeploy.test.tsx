import { assert } from 'chai';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';

import useDeploy from './useDeploy.js';

import { name } from '../common.js';
import { BlockNumberArtifact } from '../../abis/index.js';

import { createStore, StoreType } from '../../store.js';
import NetworkCRUD from '../../network/crud.js';
import { network1336 } from '../../network/data.js';
import expectThrowsAsync from '../../test/expectThrowsAsync.js';
import { AbiItem } from '../../utils/web3-utils/index.js';

const networkId = network1336.networkId;
const web3 = network1336.web3!;
const abi = BlockNumberArtifact.abi as AbiItem[];
const bytecode = BlockNumberArtifact.bytecode;
const label = 'BlockNumber';

describe(`${name}/hooks/useDeploy.test.tsx`, () => {
    let store: StoreType;
    let from: string;

    let wrapper: any;
    before(async () => {
        const accounts = await web3.eth.getAccounts();
        from = accounts[0];
    });

    beforeEach(() => {
        store = createStore();
        store.dispatch(NetworkCRUD.actions.create({ networkId, web3 }));
        //eslint-disable-next-line react/display-name
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    it('useDeploy', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useDeploy({ networkId, abi, bytecode, from, label }), {
            wrapper,
        });

        await waitForNextUpdate();
        const current1 = result.current;
        assert.isUndefined(current1[0], 'contract not exist');

        current1[1].deploy();
        await waitForNextUpdate();
        await waitForNextUpdate();

        const current2 = result.current;
        assert.isDefined(current2[0], 'contract exists');
        //No additional re-renders frm background tasks
        await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
    });

    it('useDeploy - auto', async () => {
        const { result, waitForNextUpdate } = renderHook(
            () => useDeploy({ networkId, abi, bytecode, from, label }, undefined, true),
            {
                wrapper,
            },
        );

        await waitForNextUpdate();
        await waitForNextUpdate();
        await waitForNextUpdate();

        const current1 = result.current;
        assert.isDefined(current1[0], 'contract exists');
        //No additional re-renders frm background tasks
        await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
    });
});

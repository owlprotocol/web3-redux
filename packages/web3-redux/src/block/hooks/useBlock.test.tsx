import { assert } from 'chai';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import sinon from 'sinon';

import { name } from '../common.js';

import { createStore, StoreType } from '../../store.js';
import { BlockTransaction, validate } from '../model/index.js';
import NetworkCRUD from '../../network/crud.js';
import BlockCRUD from '../crud.js';
import { network1336 } from '../../network/data.js';
import fetchAction from '../actions/fetch.js';
import { useBlock } from './index.js';

const networkId = network1336.networkId;
const web3 = network1336.web3!;

describe(`${name}/hooks/useBlock.test.tsx`, () => {
    let store: StoreType;
    let dispatchSpy: sinon.SinonSpy;
    const createActionSpy = sinon.spy(BlockCRUD.actions, 'create');
    let wrapper: any;

    after(() => {
        createActionSpy.restore();
    });

    beforeEach(() => {
        store = createStore();
        dispatchSpy = sinon.spy(store, 'dispatch');
        createActionSpy.resetHistory();
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    afterEach(() => {
        dispatchSpy.restore();
    });

    describe('useBlock', () => {
        let accounts: string[];
        let expected: BlockTransaction;

        before(async () => {
            //@ts-ignore
            accounts = await web3.eth.getAccounts();
        });

        beforeEach(async () => {
            store.dispatch(NetworkCRUD.actions.create({ networkId, web3 }));

            const txSent = await web3.eth.sendTransaction({ from: accounts[0], to: accounts[1], value: '1' });
            const block = await web3.eth.getBlock(txSent.blockNumber);
            expected = validate({
                networkId,
                ...block,
            });
        });

        it('(networkId, number, true)', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useBlock(networkId, expected.number, true), {
                wrapper,
            });

            await waitForNextUpdate(); //load undefined & fetch
            await waitForNextUpdate(); //fetch result

            const current = result.current;
            assert.deepEqual(current, expected, 'result.current');

            assert.isTrue(dispatchSpy.calledWith(sinon.match(fetchAction.match)), 'fetchAction called');
            assert.isTrue(createActionSpy.calledOnce, 'createAction called');
        });

        it('(networkId, number, false)', async () => {
            store.dispatch(BlockCRUD.actions.create(expected));

            const { result, waitForNextUpdate } = renderHook(() => useBlock(networkId, expected.number, false), {
                wrapper,
            });

            await waitForNextUpdate();

            const current = result.current;
            assert.deepEqual(current, expected, 'result.current');

            assert.isFalse(dispatchSpy.calledWith(sinon.match(fetchAction.match)), 'fetchAction called');
            assert.isTrue(createActionSpy.calledOnce, 'createAction called');
        });

        it('(networkId, number, ifnull): null', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useBlock(networkId, expected.number, 'ifnull'), {
                wrapper,
            });

            await waitForNextUpdate(); //load undefined & fetch
            await waitForNextUpdate(); //fetch result

            const current = result.current;
            assert.deepEqual(current, expected, 'result.current');

            assert.isTrue(dispatchSpy.calledWith(sinon.match(fetchAction.match)), 'fetchAction called');
            assert.isTrue(createActionSpy.calledOnce, 'createAction called');
        });

        it('(networkId, number, ifnull): defined', async () => {
            store.dispatch(BlockCRUD.actions.create(expected));

            const { result, waitForNextUpdate } = renderHook(() => useBlock(networkId, expected.number, 'ifnull'), {
                wrapper,
            });

            await waitForNextUpdate();

            const current = result.current;
            assert.deepEqual(current, expected, 'result.current');

            assert.isFalse(dispatchSpy.calledWith(sinon.match(fetchAction.match)), 'fetchAction called');
            assert.isTrue(createActionSpy.calledOnce, 'createAction called');
        });
    });
});

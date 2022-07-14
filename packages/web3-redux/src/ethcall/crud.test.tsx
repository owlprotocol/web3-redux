import { assert } from 'chai';

import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { name } from './common.js';
import { ethCall1 } from './data.js';
import EthCallCRUD from './crud.js';
import { createStore, StoreType } from '../store.js';
import expectThrowsAsync from '../test/expectThrowsAsync.js';

describe(`${name}/crud.test.js`, () => {
    describe('store', () => {
        let store: StoreType;

        beforeEach(async () => {
            store = createStore();
            store.dispatch(EthCallCRUD.actions.create(ethCall1));
        });

        it('get({networkId,to,data})', async () => {
            const selected = await EthCallCRUD.db.get({
                networkId: ethCall1.networkId,
                to: ethCall1.to,
                data: ethCall1.data,
            });
            assert.deepEqual(selected, ethCall1);
        });

        it('get({methodName})', async () => {
            const selected = await EthCallCRUD.db.get({
                methodName: ethCall1.methodName!,
            });
            assert.deepEqual(selected, ethCall1);
        });

        it('bulkGet({networkId,to,data})', async () => {
            const selected = await EthCallCRUD.db.bulkGet([
                {
                    networkId: ethCall1.networkId,
                    to: ethCall1.to,
                    data: ethCall1.data,
                },
            ]);
            assert.deepEqual(selected, [ethCall1]);
        });

        it('where({methodName})', async () => {
            const selected = await EthCallCRUD.db.where({
                methodName: ethCall1.methodName!,
            });
            assert.deepEqual(selected, [ethCall1]);
        });

        describe('hooks', () => {
            let wrapper: any;
            beforeEach(() => {
                wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
            });

            it('useGet({networkId,to,data})', async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () =>
                        EthCallCRUD.hooks.useGet({
                            networkId: ethCall1.networkId,
                            to: ethCall1.to,
                            data: ethCall1.data,
                        }),
                    {
                        wrapper,
                    },
                );

                await waitForNextUpdate();
                const [selected] = result.current;
                assert.deepEqual(selected, ethCall1);

                //No additional re-renders frm background tasks
                await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
            });

            it('useGet({methodName})', async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () =>
                        EthCallCRUD.hooks.useGet({
                            methodName: ethCall1.methodName!,
                        }),
                    {
                        wrapper,
                    },
                );

                await waitForNextUpdate();
                const [selected] = result.current;
                assert.deepEqual(selected, ethCall1);

                //No additional re-renders frm background tasks
                await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
            });

            it('useGetBulk([{networkId,to,data}])', async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () =>
                        EthCallCRUD.hooks.useGetBulk([
                            {
                                networkId: ethCall1.networkId,
                                to: ethCall1.to,
                                data: ethCall1.data,
                            },
                        ]),
                    {
                        wrapper,
                    },
                );

                await waitForNextUpdate();
                const [selected] = result.current;
                assert.deepEqual(selected, [ethCall1]);

                //No additional re-renders frm background tasks
                await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
            });

            it('useWhere({methodName})', async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () =>
                        EthCallCRUD.hooks.useWhere({
                            methodName: ethCall1.methodName!,
                        }),
                    {
                        wrapper,
                    },
                );

                await waitForNextUpdate();
                const [selected] = result.current;
                assert.deepEqual(selected, [ethCall1]);

                //No additional re-renders frm background tasks
                await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
            });
        });
    });
});

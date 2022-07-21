import { assert } from 'chai';

import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { name } from './common.js';
import { ethCall1, ethCall2 } from './data.js';
import EthCallCRUD from './crud.js';
import { createStore, StoreType } from '../store.js';
import expectThrowsAsync from '../test/expectThrowsAsync.js';

describe(`${name}/crud.test.js`, () => {
    describe('db', () => {
        describe('read', () => {
            beforeEach(async () => {
                await EthCallCRUD.db.add(ethCall1);
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

            it('where({networkId},{limit:1})', async () => {
                await EthCallCRUD.db.add(ethCall2);
                const selected = await EthCallCRUD.db.where(
                    {
                        networkId: ethCall1.networkId!,
                    },
                    { limit: 1 },
                );
                assert.deepEqual(selected, [ethCall1]);
            });

            it('where({networkId},{reverse:true,limit:1})', async () => {
                await EthCallCRUD.db.add(ethCall2);
                const selected = await EthCallCRUD.db.where(
                    {
                        networkId: ethCall1.networkId!,
                    },
                    { reverse: true, limit: 1 },
                );
                assert.deepEqual(selected, [ethCall2]);
            });

            it('where({networkId},{offset:1,limit:1})', async () => {
                await EthCallCRUD.db.add(ethCall2);
                const selected = await EthCallCRUD.db.where(
                    {
                        networkId: ethCall1.networkId!,
                    },
                    { offset: 1, limit: 1 },
                );
                assert.deepEqual(selected, [ethCall2]);
            });
        });
        describe('write', () => {
            it('add', async () => {
                await EthCallCRUD.db.add(ethCall1);
                const selected = await EthCallCRUD.db.get({
                    networkId: ethCall1.networkId,
                    to: ethCall1.to,
                    data: ethCall1.data,
                });
                assert.deepEqual(selected, ethCall1);
            });

            it('bulkAdd', async () => {
                await EthCallCRUD.db.bulkAdd([ethCall1]);
                const selected = await EthCallCRUD.db.get({
                    networkId: ethCall1.networkId,
                    to: ethCall1.to,
                    data: ethCall1.data,
                });
                assert.deepEqual(selected, ethCall1);
            });

            it('put', async () => {
                await EthCallCRUD.db.put(ethCall1);
                const selected = await EthCallCRUD.db.get({
                    networkId: ethCall1.networkId,
                    to: ethCall1.to,
                    data: ethCall1.data,
                });
                assert.deepEqual(selected, ethCall1);
            });

            it('bulkPut', async () => {
                await EthCallCRUD.db.bulkPut([ethCall1]);
                const selected = await EthCallCRUD.db.get({
                    networkId: ethCall1.networkId,
                    to: ethCall1.to,
                    data: ethCall1.data,
                });
                assert.deepEqual(selected, ethCall1);
            });

            it('update', async () => {
                await EthCallCRUD.db.add(ethCall1);
                await EthCallCRUD.db.update({ ...ethCall1, returnValue: 42 });
                const selected = await EthCallCRUD.db.get({
                    networkId: ethCall1.networkId,
                    to: ethCall1.to,
                    data: ethCall1.data,
                });
                assert.deepEqual(selected, { ...ethCall1, returnValue: 42 });
            });

            it('bulkUpdate', async () => {
                await EthCallCRUD.db.add(ethCall1);
                await EthCallCRUD.db.bulkUpdate([{ ...ethCall1, returnValue: 42 }]);
                const selected = await EthCallCRUD.db.get({
                    networkId: ethCall1.networkId,
                    to: ethCall1.to,
                    data: ethCall1.data,
                });
                assert.deepEqual(selected, { ...ethCall1, returnValue: 42 });
            });

            it('upsert - insert', async () => {
                await EthCallCRUD.db.upsert(ethCall1);
                const selected = await EthCallCRUD.db.get({
                    networkId: ethCall1.networkId,
                    to: ethCall1.to,
                    data: ethCall1.data,
                });
                assert.deepEqual(selected, ethCall1);
            });

            it('upsert - update', async () => {
                await EthCallCRUD.db.add(ethCall1);
                await EthCallCRUD.db.upsert({ ...ethCall1, returnValue: 42 });
                const selected = await EthCallCRUD.db.get({
                    networkId: ethCall1.networkId,
                    to: ethCall1.to,
                    data: ethCall1.data,
                });
                assert.deepEqual(selected, { ...ethCall1, returnValue: 42 });
            });

            it('upsert - update concurrent', async () => {
                const add = EthCallCRUD.db.add(ethCall1);
                const upsert = EthCallCRUD.db.upsert({ ...ethCall1, returnValue: 42 });
                await Promise.all([add, upsert]);
                const selected = await EthCallCRUD.db.get({
                    networkId: ethCall1.networkId,
                    to: ethCall1.to,
                    data: ethCall1.data,
                });
                assert.deepEqual(selected, { ...ethCall1, returnValue: 42 });
            });

            it('bulkUpsert - insert', async () => {
                await EthCallCRUD.db.bulkUpsert([ethCall1]);
                const selected = await EthCallCRUD.db.get({
                    networkId: ethCall1.networkId,
                    to: ethCall1.to,
                    data: ethCall1.data,
                });
                assert.deepEqual(selected, ethCall1);
            });
        });
    });

    describe('hooks', () => {
        let store: StoreType;
        let wrapper: any;

        beforeEach(async () => {
            store = createStore();
            store.dispatch(EthCallCRUD.actions.create(ethCall1));
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

            const [, { isLoading }] = result.current;
            assert.isTrue(isLoading);

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

            const [, { isLoading }] = result.current;
            assert.isTrue(isLoading);

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

            const [, { isLoading }] = result.current;
            assert.isTrue(isLoading);

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

            const [, { isLoading }] = result.current;
            assert.isTrue(isLoading);

            await waitForNextUpdate();
            const [selected] = result.current;
            assert.deepEqual(selected, [ethCall1]);

            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });

        it('useWhere({networkId,{limit:1}})', async () => {
            store.dispatch(EthCallCRUD.actions.create(ethCall2));

            const { result, waitForNextUpdate } = renderHook(
                () =>
                    EthCallCRUD.hooks.useWhere(
                        {
                            networkId: ethCall1.networkId!,
                        },
                        { limit: 1 },
                    ),
                {
                    wrapper,
                },
            );

            const [, { isLoading }] = result.current;
            assert.isTrue(isLoading);

            await waitForNextUpdate();
            const [selected] = result.current;
            assert.deepEqual(selected, [ethCall1]);

            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });

        it('useWhere({networkId,{limit:1,offset:1}})', async () => {
            store.dispatch(EthCallCRUD.actions.create(ethCall2));

            const { result, waitForNextUpdate } = renderHook(
                () =>
                    EthCallCRUD.hooks.useWhere(
                        {
                            networkId: ethCall1.networkId!,
                        },
                        { limit: 1, offset: 1 },
                    ),
                {
                    wrapper,
                },
            );

            const [, { isLoading }] = result.current;
            assert.isTrue(isLoading);

            await waitForNextUpdate();
            const [selected] = result.current;
            assert.deepEqual(selected, [ethCall2]);

            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
    });
});

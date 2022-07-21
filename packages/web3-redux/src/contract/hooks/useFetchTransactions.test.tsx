import { assert } from 'chai';
import axios from 'axios';
import * as moxios from 'moxios';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';

import { useFetchTransactions } from './useFetchTransactions.js';

import { networkId, ADDRESS_0, ADDRESS_1 } from '../../test/data.js';
import { createStore, StoreType } from '../../store.js';

import { expectThrowsAsync } from '../../test/index.js';
import NetworkCRUD from '../../network/crud.js';
import ContractCRUD from '../crud.js';

describe('contract/hooks/useFetchTransactions.test.tsx', () => {
    let store: StoreType;
    let wrapper: any;

    const client = axios.create({ baseURL: 'https://api.etherscan.io/api' });
    const address = ADDRESS_0;

    before(async () => {
        //Moxios install
        moxios.install(client);
    });

    after(() => {
        moxios.uninstall(client);
    });

    beforeEach(() => {
        store = createStore();
        store.dispatch(
            NetworkCRUD.actions.create({
                networkId,
                explorerApiClient: client,
            }),
        );
        store.dispatch(ContractCRUD.actions.create({ networkId, address }));
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    describe('useFetchTransactions', () => {
        it('(networkId, address)', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useFetchTransactions(networkId, address), {
                wrapper,
            });

            await moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                assert.deepEqual(request.config.params, {
                    module: 'account',
                    action: 'txlist',
                    address,
                    startblock: 0,
                    endblock: 99999999,
                    page: 1,
                    offset: 10,
                    sort: 'desc',
                });
                request.respondWith({
                    status: 200,
                    response: {
                        result: [
                            {
                                blockNumber: '1',
                                hash: '0xffff',
                                from: address,
                                to: ADDRESS_1,
                            },
                        ],
                    },
                });
            });
            await waitForNextUpdate();
            assert.equal(result.current.from.length, 1, 'result.current.length');
            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
    });
});

import { assert } from 'chai';
import axios from 'axios';
import moxios from 'moxios';

import WETH from '../../abis/WETH.json';

import { sleep } from '../../utils';
import { networkId, WETH as WETH_ADDRESS } from '../../test/data';
import { createStore, StoreType } from '../../store';
import { create as createNetwork } from '../../network';
import { selectByIdSingle as selectContract } from '../selectors';
import { fetchAbi as fetchAbiAction } from '../actions';

describe('contract/sagas/fetchAbi.test.ts', () => {
    let store: StoreType;
    const address = WETH_ADDRESS; //WETH contract
    const client = axios.create({ baseURL: 'https://api.etherscan.io/api' });

    before(async () => {
        //Moxios install
        moxios.install(client);
    });

    after(() => {
        moxios.uninstall(client);
    });

    beforeEach(async () => {
        ({ store } = createStore());
        store.dispatch(
            createNetwork({
                networkId,
                explorerApiClient: client,
            }),
        );
    });

    describe('fetchAbi', () => {
        it('()', async () => {
            store.dispatch(
                fetchAbiAction({
                    networkId,
                    address,
                }),
            );

            await moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                assert.deepEqual(request.config.params, { module: 'contract', action: 'getabi', address });
                request.respondWith({ status: 200, response: { result: JSON.stringify(WETH.abi) } });
            });

            await sleep(100);
            //Selector
            const contract = selectContract(store.getState(), { networkId, address });
            assert.deepEqual(contract?.abi, WETH.abi as any, 'contract.abi != WETH.abi');
        });
    });
});

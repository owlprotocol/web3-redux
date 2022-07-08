import { assert } from 'chai';
import axios from 'axios';
import * as moxios from 'moxios';

import { WETH } from '../../abis/index.js';

import { sleep } from '../../utils/index.js';
import { networkId, WETH as WETH_ADDRESS } from '../../test/data.js';
import { createStore, StoreType } from '../../store.js';

import { fetchAbi as fetchAbiAction } from '../actions/index.js';
import NetworkCRUD from '../../network/crud.js';
import ContractCRUD from '../crud.js';

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
            NetworkCRUD.actions.create({
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
            const contract = ContractCRUD.selectors.selectByIdSingle(store.getState(), { networkId, address });
            assert.deepEqual(contract?.abi, WETH.abi as any, 'contract.abi != WETH.abi');
        });
    });
});

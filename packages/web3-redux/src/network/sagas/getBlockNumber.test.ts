import { testSaga } from 'redux-saga-test-plan';

import { assert } from 'chai';
import Web3 from 'web3';
import getBlockNumber from './getBlockNumber.js';
import loadNetwork from './loadNetwork.js';
import { getBlockNumberAction } from '../actions/index.js';
import { name } from '../common.js';
import NetworkCRUD from '../../network/crud.js';
import { network1336 } from '../../network/data.js';
import { createStore, StoreType } from '../../store.js';
import sleep from '../../utils/sleep.js';

const networkId = network1336.networkId;
const web3 = network1336.web3;
const action = getBlockNumberAction(networkId, '');

describe(`${name}/sagas/getBlockNumber.test.ts`, () => {
    describe('unit', () => {
        it('getBlockNumber', async () => {
            testSaga(getBlockNumber, action)
                .next()
                .call(loadNetwork, networkId, action.meta.uuid)
                .next({ networkId, web3 })
                .call(web3!.eth.getBlockNumber)
                .next(1)
                .put(NetworkCRUD.actions.update({ networkId, latestBlockNumber: 1 }, ''))
                .next()
                .isDone();
        });
    });
    describe('store', () => {
        let store: StoreType;
        const web3 = new Web3('http://localhost:8545');

        beforeEach(async () => {
            await NetworkCRUD.db.add({ networkId, web3Rpc: 'http://localhost:8545' });
            store = createStore();
        });

        it('getBlockNumber', async () => {
            //Redux undefined
            const selected1 = NetworkCRUD.selectors.selectByIdSingle(store.getState(), networkId);
            assert.isNull(selected1, 'selected1');

            //Dispatch getBlockNumber, also hydrates store
            store.dispatch(action);
            await sleep(400);

            const selected2 = NetworkCRUD.selectors.selectByIdSingle(store.getState(), networkId);
            assert.isDefined(selected2, 'selected2');
            assert.isDefined(selected2?.web3, 'selected2.web3');
            assert.equal(selected2?.latestBlockNumber, await web3?.eth.getBlockNumber());
        });
    });
});

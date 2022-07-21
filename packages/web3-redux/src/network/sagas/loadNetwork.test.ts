import { testSaga } from 'redux-saga-test-plan';
import loadNetwork from './loadNetwork.js';

import { name } from '../common.js';
import NetworkCRUD from '../../network/crud.js';
import { network1336 } from '../../network/data.js';

const networkId = network1336.networkId;
const web3 = network1336.web3;

describe(`${name}/sagas/loadNetwork.test.ts`, () => {
    describe('unit', () => {
        it('loadNetwork - existing', async () => {
            testSaga(loadNetwork, networkId, '')
                .next()
                .select(NetworkCRUD.selectors.selectByIdSingle, networkId)
                .next({ networkId, web3 })
                .call(NetworkCRUD.db.get, networkId)
                .next({ networkId })
                .returns({ networkId, web3 })
                .next()
                .isDone();
        });
        it('loadNetwork - hydrate', async () => {
            testSaga(loadNetwork, networkId, '')
                .next()
                .select(NetworkCRUD.selectors.selectByIdSingle, networkId)
                .next({ networkId }) //no web3 instance, will hydrate
                .call(NetworkCRUD.db.get, networkId)
                .next({ networkId, web3Rpc: 'http://localhost:8545' })
                .put(NetworkCRUD.actions.upsert({ networkId, web3Rpc: 'http://localhost:8545' }, ''))
                .next()
                .select(NetworkCRUD.selectors.selectByIdSingle, networkId)
                .next({ networkId, web3 })
                .returns({ networkId, web3 })
                .next()
                .isDone();
        });
    });

    describe('integration', () => {
        it('loadNetwork', async () => {
            //expectSaga(loadNetwork, networkId).select();
        });
    });
});

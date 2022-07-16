import { testSaga } from 'redux-saga-test-plan';

import getBlockNumber from './getBlockNumber.js';
import loadNetwork from './loadNetwork.js';
import { getBlockNumberAction } from '../actions/index.js';
import { name } from '../common.js';
import NetworkCRUD from '../../network/crud.js';
import { network1336 } from '../../network/data.js';

const networkId = network1336.networkId;
const web3 = network1336.web3;

describe(`${name}/sagas/getBlockNumber.test.ts`, () => {
    describe('unit', () => {
        it('getBlockNumber', async () => {
            testSaga(getBlockNumber, getBlockNumberAction(networkId, ''))
                .next()
                .call(loadNetwork, networkId)
                .next({ networkId, web3 })
                .call(web3!.eth.getBlockNumber)
                .next(1)
                .put(NetworkCRUD.actions.update({ networkId, latestBlockNumber: 1 }, ''))
                .next()
                .isDone();
        });
    });
});

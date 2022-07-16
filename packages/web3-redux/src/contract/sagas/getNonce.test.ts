import { assert } from 'chai';
import { testSaga } from 'redux-saga-test-plan';
import getNonce from './getNonce.js';

import { ADDRESS_0 } from '../../test/data.js';
import { createStore, StoreType } from '../../store.js';

import { name } from '../common.js';

import { getNonce as getNonceAction } from '../actions/index.js';
import NetworkCRUD from '../../network/crud.js';
import ContractCRUD from '../crud.js';
import { network1336 } from '../../network/data.js';
import loadNetwork from '../../network/sagas/loadNetwork.js';
import sleep from '../../utils/sleep.js';

const networkId = network1336.networkId;
const web3 = network1336.web3!;
const address = ADDRESS_0;
const action = getNonceAction({ networkId, address }, '');

describe(`${name}/sagas/getNonce.test.ts`, () => {
    describe('unit', () => {
        it('getNonce', () => {
            testSaga(getNonce, action)
                .next()
                .call(loadNetwork, networkId)
                .next({ networkId, web3 })
                .call(web3.eth.getTransactionCount, address)
                .next('0')
                .put(ContractCRUD.actions.upsert({ networkId, address, nonce: 0 }, ''));
        });
    });

    describe('store', () => {
        let store: StoreType;

        beforeEach(async () => {
            store = createStore();
            store.dispatch(NetworkCRUD.actions.create({ networkId, web3 }));
        });

        it('getNonce', async () => {
            store.dispatch(getNonceAction({ networkId, address }));
            await sleep(1000);

            const expected = await web3.eth.getTransactionCount(address!);
            const account = await ContractCRUD.db.get({ networkId, address });

            assert.equal(account!.nonce, expected, 'initial nonce');
        });
    });
});

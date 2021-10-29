import { expect } from 'chai';
import { testSaga } from 'redux-saga-test-plan';
import Web3 from 'web3';
import ganache from 'ganache-core';

import networkExists from '../../network/sagas/networkExists';
import { ZERO_ADDRESS } from '../../utils';
import { Network } from '../../network/model';

import { name } from '../common';
import { selectByIdSingle } from '../selectors';

//Actions
import fetchBalanceAction from '../actions/fetchBalance';
import fetchNonceAction from '../actions/fetchNonce';
//import fetchBalanceSyncedAction from '../actions/fetchBalanceSynced'
//import fetchNonceSyncedAction from '../actions/fetchNonceSynced';

import setAction from '../actions/set';

//Sagas
import exists from './exists';
import fetchBalance from './fetchBalance';
import fetchNonce from './fetchNonce';
//import fetchBalanceSynced from './fetchBalanceSynced';
//import fetchNonceSynced from './fetchNonceSynced';

describe(`${name}.sagas`, () => {
    const networkId = '1337';

    const item = { networkId, address: ZERO_ADDRESS };
    const id = `${networkId}-${ZERO_ADDRESS}`;
    const itemWithId = { id, ...item };

    let network: Network;

    before(async () => {
        const provider = ganache.provider({
            networkId: parseInt(networkId),
        });
        //@ts-ignore
        const web3 = new Web3(provider);
        network = { networkId, web3 };
    });

    describe('exists()', () => {
        it(`error: ${name} undefined`, () => {
            expect(testSaga(exists, id).next().select(selectByIdSingle, id).next).to.throw(`${name} ${id} undefined`);
        });
        it('exists', () => {
            const gen = testSaga(exists, id).next().select(selectByIdSingle, id).next(itemWithId);
            gen.returns(itemWithId);
            gen.isDone();
        });
    });

    describe('fetchBalance', () => {
        //TODO: Add error handling for web3 api
        it('success', () => {
            testSaga(fetchBalance, fetchBalanceAction(id))
                .next()
                .call(exists, id)
                .next(itemWithId)
                .call(networkExists, networkId)
                .next(network)
                .call(network.web3!.eth.getBalance, item.address)
                .next('0')
                .put(setAction({ id, key: 'balance', value: '0' }));
        });
    });

    describe('fetchNonce', () => {
        //TODO: Add error handling for web3 api
        it('success', () => {
            testSaga(fetchNonce, fetchNonceAction(id))
                .next()
                .call(exists, id)
                .next(itemWithId)
                .call(networkExists, networkId)
                .next(network)
                .call(network.web3!.eth.getTransactionCount, item.address)
                .next('0')
                .put(setAction({ id, key: 'nonce', value: '0' }));
        });
    });
});

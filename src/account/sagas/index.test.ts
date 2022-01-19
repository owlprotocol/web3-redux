import { expect } from 'chai';
import { testSaga } from 'redux-saga-test-plan';
import Web3 from 'web3';
import ganache from 'ganache-core';

import networkExists from '../../network/sagas/exists';
import { ZERO_ADDRESS } from '../../utils';
import { Network } from '../../network/model';
import createSync from '../../sync/actions/create';

import { name } from '../common';
import { selectByIdSingle } from '../selectors';

//Actions
import fetchBalanceAction from '../actions/fetchBalance';
import fetchNonceAction from '../actions/fetchNonce';
import fetchBalanceSyncedAction from '../actions/fetchBalanceSynced';
import fetchNonceSyncedAction from '../actions/fetchNonceSynced';

import setAction from '../actions/set';

//Sagas
import exists from './exists';
import fetchBalance from './fetchBalance';
import fetchNonce from './fetchNonce';
import fetchBalanceSynced from './fetchBalanceSynced';
import fetchNonceSynced from './fetchNonceSynced';
import { getId } from '../model/interface';

describe(`${name}.sagas`, () => {
    const networkId = '1337';

    const item = { networkId, address: ZERO_ADDRESS };
    const itemWithId = { item: getId(item), ...item };

    let network: Network;

    before(() => {
        const provitemer = ganache.provider({
            networkId: parseInt(networkId),
        });
        //@ts-ignore
        const web3 = new Web3(provitemer);
        network = { networkId, web3 };
    });

    describe('exists()', () => {
        it(`error: ${name} undefined`, () => {
            expect(testSaga(exists, item).next().select(selectByIdSingle, item).next).to.throw(
                `${name} ${item} undefined`,
            );
        });
        it('exists', () => {
            const gen = testSaga(exists, item).next().select(selectByIdSingle, item).next(itemWithId);
            gen.returns(itemWithId);
            gen.isDone();
        });
    });

    describe('fetchBalance', () => {
        //TODO: Add error handling for web3 api
        it('success', () => {
            testSaga(fetchBalance, fetchBalanceAction(item))
                .next()
                .call(exists, item)
                .next(itemWithId)
                .call(networkExists, networkId)
                .next(network)
                .call(network.web3!.eth.getBalance, item.address)
                .next('0')
                .put(setAction({ id: item, key: 'balance', value: '0' }));
        });
    });

    describe('fetchNonce', () => {
        //TODO: Add error handling for web3 api
        it('success', () => {
            testSaga(fetchNonce, fetchNonceAction(item))
                .next()
                .call(exists, item)
                .next(itemWithId)
                .call(networkExists, networkId)
                .next(network)
                .call(network.web3!.eth.getTransactionCount, item.address)
                .next('0')
                .put(setAction({ id: item, key: 'nonce', value: '0' }));
        });
    });

    describe('fetchBalanceSynced', () => {
        it('success', () => {
            const action = fetchBalanceSyncedAction({ ...item, sync: 'Transaction' });
            testSaga(fetchBalanceSynced, action)
                .next()
                .put(action.payload.fetchBalanceAction)
                .next()
                .put(createSync(action.payload.sync!));
        });
    });

    describe('fetchNonceSynced', () => {
        it('success', () => {
            const action = fetchNonceSyncedAction({ ...item, sync: 'Transaction' });
            testSaga(fetchNonceSynced, action)
                .next()
                .put(action.payload.fetchNonceAction)
                .next()
                .put(createSync(action.payload.sync!));
        });
    });
});

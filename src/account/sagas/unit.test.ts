import { expect } from 'chai';
import { testSaga } from 'redux-saga-test-plan';
import Web3 from 'web3';
import ganache from 'ganache-core';

import { name } from '../common';
import { selectByIdSingle } from '../selectors';

import fetchBalanceAction from '../actions/fetchBalance';

import exists from './exists';
import fetchBalance from './fetchBalance';
import networkExists from '../../network/sagas/networkExists';
import { ZERO_ADDRESS } from '../../utils';
import { Network } from '../../network/model';

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
        it('fetch', () => {
            testSaga(fetchBalance, fetchBalanceAction(id))
                .next()
                .call(exists, id)
                .next(itemWithId)
                .call(networkExists, networkId)
                .next(network)
                .call(network.web3!.eth.getBalance, item.address);
        });
    });
});

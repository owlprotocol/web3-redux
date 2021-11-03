import { expect } from 'chai';
import { testSaga } from 'redux-saga-test-plan';
import Web3 from 'web3';
import ganache from 'ganache-core';

import { Network } from '../../network/model';

import { name } from '../common';
import { selectByIdSingle } from '../selectors';

//Actions
import fetchAction from '../actions/fetch';

//Sagas
import exists from './exists';
import fetch from './fetch';
import { getId, Interface } from '../model/interface';

describe(`${name}.sagas`, () => {
    const networkId = '1337';

    const item: Interface = { networkId, number: 0 };
    const id = getId(item);
    const itemWithId = { id, ...item };

    let network: Network;

    before(() => {
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

    describe('fetch', () => {
        it('success', () => {
            testSaga(fetch, fetchAction({ networkId: item.networkId, blockHashOrBlockNumber: item.number }))
                .next()
                .call(network.web3!.eth.getBlock, item.number);
        });
    });
});

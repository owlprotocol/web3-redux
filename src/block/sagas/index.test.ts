import { expect } from 'chai';
import { testSaga } from 'redux-saga-test-plan';
import Web3 from 'web3';
import { getWeb3Provider } from '../../utils';

import { Network } from '../../network/model';
import networkExists from '../../network/sagas/exists';

import { name } from '../common';
import { networkId } from '../../test/data';
import { selectByIdSingle } from '../selectors';

//Actions
import fetchAction from '../actions/fetch';
import createAction from '../actions/create';

//Sagas
import exists from './exists';
import fetch from './fetch';
import { BlockId, BlockHeader } from '../model';

describe(`${name}.sagas`, () => {
    const item: BlockHeader = { networkId, number: 0 };
    const id: BlockId = { ...item };
    const itemWithId = { id, ...item };

    let network: Network;

    before(() => {
        const provider = getWeb3Provider();
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
        it.skip('create', () => {
            const block = { number: item.number, hash: 'XYZ' };
            testSaga(fetch, fetchAction({ networkId: item.networkId, blockHashOrBlockNumber: item.number }))
                .next()
                .call(networkExists, item.networkId)
                .next(network)
                .next(block) //fetched block
                .put(createAction({ ...block, networkId: item.networkId }));
        });
    });
});

import { expect } from 'chai';
import { testSaga } from 'redux-saga-test-plan';
import Web3 from 'web3';
import exists from './exists.js';
import fetch from './fetch.js';
import { getWeb3Provider } from '../../test/index.js';

import { Network } from '../../network/model/index.js';
import networkExists from '../../network/sagas/exists.js';

import { name } from '../common.js';
import { networkId } from '../../test/data.js';
import { selectByIdSingle } from '../selectors/index.js';

//Actions
import fetchAction from '../actions/fetch.js';
import createAction from '../actions/create.js';

//Sagas
import { BlockId, BlockHeader } from '../model/index.js';

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

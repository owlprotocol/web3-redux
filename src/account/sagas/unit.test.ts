import { assert, expect } from 'chai';
import { call, select } from 'redux-saga/effects';
import Web3 from 'web3';
import ganache from 'ganache-core';

import { name } from '../common';
import { selectByIdSingle } from '../selectors';

import Interface, { validate } from '../model/interface';

import fetchBalanceAction from '../actions/fetchBalance';

import exists from './exists';
import fetchBalance from './fetchBalance';
import networkExists from '../../network/sagas/networkExists';
import { ZERO_ADDRESS } from '../../utils';

describe(`${name}.sagas`, () => {
    const networkId = '1337';
    let network: any;
    let account: Interface;

    before(async () => {
        account = validate({ networkId, address: ZERO_ADDRESS });
        network = { networkId };
    });

    describe('exists()', () => {
        it('yield select(selectByIdSingle, id)', () => {
            const gen = exists(account.id);
            const val = gen.next();
            assert.deepEqual(val.value, select(selectByIdSingle, account.id));
        });
        it('error: Account undefined', () => {
            const gen = exists(account.id);
            gen.next(); //saga  task

            //@ts-ignore
            expect(gen.next.bind(gen, undefined)).to.throw(`Account ${account.id} undefined`);
        });
        it('exists', () => {
            const gen = exists(account.id);
            gen.next(); //saga  task

            gen.next(network);
            assert.isTrue(gen.next().done);
        });
    });

    describe('fetchBalance()', () => {
        it('yield call(exists,id)', () => {
            const gen = fetchBalance(fetchBalanceAction(account.id));
            const val = gen.next();
            assert.deepEqual(val.value, call(exists, account.id));
        });

        it('yield call(networkExists,networkId)', () => {
            const gen = fetchBalance(fetchBalanceAction(account.id));
            gen.next(); //account exists
            //@ts-ignore
            const val = gen.next('TEST');
            console.debug(val.value);
            assert.deepEqual(val.value, call(networkExists, account.networkId));
        });

        it('error: Network missing web3', () => {
            const gen = fetchBalance(fetchBalanceAction(account.id));
            //@ts-ignore
            gen.next(); //account exists
            //@ts-ignore
            gen.next({ web3: true }); //network exists
            expect(gen.next).to.throw(`Network ${account.networkId} missing web3`);
        });

        it('yield call(web3.eth.getBalance,address)', () => {
            const provider = ganache.provider({
                networkId: parseInt(networkId),
            });
            //@ts-ignore
            const web3 = new Web3(provider);

            const gen = fetchBalance(fetchBalanceAction(account.id));
            gen.next(); //account exists
            //@ts-ignore
            gen.next('HELLO'); //network exists
            const val = gen.next();
            //@ts-ignore
            assert.deepEqual(val.value, call(web3.eth.getBalance, account.address));
        });
    });
});

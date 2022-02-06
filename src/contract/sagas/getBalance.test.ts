import { assert } from 'chai';
import Web3 from 'web3';
import { getWeb3Provider } from '../../utils';

import { networkId } from '../../test/data';
import { createStore, StoreType } from '../../store';
import { create as createNetwork } from '../../network/actions';
import { Contract } from '../model/interface';
import { name } from '../common';
import { selectByIdSingle } from '../selectors';
import { create as createAction, getBalance as getBalanceAction } from '../actions';

describe(`${name}.integration`, () => {
    let store: StoreType;
    let web3: Web3;

    let item: Contract;

    before(async () => {
        const provider = getWeb3Provider();
        //@ts-ignore
        web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        item = { networkId, address: accounts[0] };
    });

    beforeEach(() => {
        ({ store } = createStore());
        store.dispatch(createNetwork({ networkId, web3 }));
        store.dispatch(createAction(item));
    });

    it('getBalance()', async () => {
        store.dispatch(getBalanceAction(item));
        const expected = await web3.eth.getBalance(item.address!);
        const account = selectByIdSingle(store.getState(), item);
        assert.equal(account!.balance, expected, 'initial balance');
    });
});

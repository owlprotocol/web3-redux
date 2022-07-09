import { assert } from 'chai';
import Web3 from 'web3';
import { getWeb3Provider } from '../../test/index.js';

import { networkId } from '../../test/data.js';
import { createStore, StoreType } from '../../store.js';

import { Contract } from '../model/interface.js';
import { name } from '../common.js';

import { getBalance as getBalanceAction } from '../actions/index.js';
import NetworkCRUD from '../../network/crud.js';
import ContractCRUD from '../crud.js';

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
        store = createStore();
        store.dispatch(NetworkCRUD.actions.create({ networkId, web3 }));
        store.dispatch(ContractCRUD.actions.create(item));
    });

    it('getBalance()', async () => {
        store.dispatch(getBalanceAction(item));
        const expected = await web3.eth.getBalance(item.address!);
        const account = await ContractCRUD.db.get(item);
        assert.equal(account!.balance, expected, 'initial balance');
    });
});

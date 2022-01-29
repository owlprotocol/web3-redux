import { assert } from 'chai';
import Web3 from 'web3';
import Ganache from 'ganache-core';
import { networkId } from '../../test/data';
import { createStore, StoreType } from '../../store';
import { create as createNetwork } from '../../network/actions';
import { Contract } from '../model/interface';
import { name } from '../common';
import { selectByIdSingle } from '../selectors';
import { create as createAction, fetchNonce as fetchNonceAction } from '../actions';

describe(`${name}.integration`, () => {
    let store: StoreType;
    let web3: Web3;

    let item: Contract;

    before(async () => {
        const provider = Ganache.provider({
            networkId: parseInt(networkId),
        });
        //@ts-ignore
        web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        item = { networkId, address: accounts[0] };
    });

    beforeEach(() => {
        store = createStore();
        store.dispatch(createNetwork({ networkId, web3 }));
        store.dispatch(createAction(item));
    });

    it('fetchNonce()', async () => {
        store.dispatch(fetchNonceAction(item));
        const expected = await web3.eth.getTransactionCount(item.address!);
        const account = selectByIdSingle(store.getState(), item);
        assert.equal(account!.nonce, expected, 'initial nonce');
    });
});

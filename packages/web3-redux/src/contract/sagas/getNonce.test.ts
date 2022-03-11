import { assert } from 'chai';
import Web3 from 'web3';
import { getWeb3Provider } from '../../test/index.js';

import { networkId } from '../../test/data.js';
import { createStore, StoreType } from '../../store.js';
import { create as createNetwork } from '../../network/actions/index.js';
import { Contract } from '../model/interface.js';
import { name } from '../common.js';
import { selectByIdSingle } from '../selectors/index.js';
import { create as createAction, getNonce as getNonceAction } from '../actions/index.js';

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

    it('getNonce()', async () => {
        store.dispatch(getNonceAction(item));
        const expected = await web3.eth.getTransactionCount(item.address!);
        const account = selectByIdSingle(store.getState(), item);
        assert.equal(account!.nonce, expected, 'initial nonce');
    });
});
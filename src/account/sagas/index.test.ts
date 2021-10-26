import { assert } from 'chai';
import Web3 from 'web3';
import ganache from 'ganache-core';

import { create as createNetwork } from '../../network/actions';
import { createStore } from '../../store';
import { selectByAddressSingle } from '../selector';
import { fetchBalance, fetchNonce, create } from '../actions';

const networkId = '1337';

describe('account.sagas', () => {
    let web3: Web3; //Web3 loaded from store
    let address: string;
    let store: ReturnType<typeof createStore>;

    before(async () => {
        const networkIdInt = parseInt(networkId);
        const provider = ganache.provider({
            networkId: networkIdInt,
        });
        //@ts-ignore
        web3 = new Web3(provider);
        //Disable ENS to avoid extra account calls
        //@ts-ignore
        web3.eth.ens._lastSyncCheck = Number.MAX_SAFE_INTEGER;
        //@ts-ignore
        web3.eth.ens.registryAddress = '0x0000000000000000000000000000000000000000';

        const accounts = await web3.eth.getAccounts();
        address = accounts[0]!;
    });

    beforeEach(async () => {
        store = createStore();
        store.dispatch(createNetwork({ networkId, web3 }));
        store.dispatch(create({ networkId, address }));
    });

    it('fetchBalance()', async () => {
        store.dispatch(fetchBalance({ networkId, address }));

        const expected = await web3.eth.getBalance(address);
        const account = selectByAddressSingle(store.getState(), networkId, address);
        assert.deepEqual(account!.balance, expected, 'selectByAddress');
    });

    it('fetchNonce()', async () => {
        store.dispatch(fetchNonce({ networkId, address }));

        const expected = await web3.eth.getTransactionCount(address);
        const account = selectByAddressSingle(store.getState(), networkId, address);
        assert.deepEqual(account!.nonce, expected, 'selectByAddress');
    });
});

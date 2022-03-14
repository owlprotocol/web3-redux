import { assert } from 'chai';
import Web3 from 'web3';
import { createStore, StoreType } from '../../store.js';
import { network1, contract1, contract1Id } from '../../test/data.js';
import { Network, Contract } from '../../index.js';

describe('onNetworkUpdate', () => {
    //Indexes
    let store: StoreType;
    const web3 = new Web3('http://localhost:8545');
    const web3Sender = new Web3('http://localhost:8545');

    beforeEach(() => {
        ({ store } = createStore());
    });

    it('createNetwork', () => {
        store.dispatch(Contract.create(contract1));
        store.dispatch(Network.create({ ...network1, web3, web3Sender }));

        const selected1 = Contract.selectByIdSingle(store.getState(), contract1Id)!;
        assert.isDefined(selected1.web3Contract, 'web3Contract');
        assert.isDefined(selected1.web3SenderContract, 'web3SenderContract');
    });

    it('updateNetwork', () => {
        store.dispatch(Contract.create(contract1));
        store.dispatch(Network.create({ ...network1 }));
        store.dispatch(Network.update({ networkId: network1.networkId, web3, web3Sender }));

        const selected1 = Contract.selectByIdSingle(store.getState(), contract1Id)!;
        assert.isDefined(selected1.web3Contract, 'web3Contract');
        assert.isDefined(selected1.web3SenderContract, 'web3SenderContract');
    });

    it('setNetwork(key:web3)', () => {
        store.dispatch(Contract.create(contract1));
        store.dispatch(Network.create({ ...network1 }));
        store.dispatch(Network.set({ id: network1.networkId, key: 'web3', value: web3 }));

        const selected1 = Contract.selectByIdSingle(store.getState(), contract1Id)!;
        assert.isDefined(selected1.web3Contract, 'web3Contract');
        assert.isUndefined(selected1.web3SenderContract, 'web3SenderContract');
    });

    it('setNetwork(key:web3Sender)', () => {
        store.dispatch(Contract.create(contract1));
        store.dispatch(Network.create({ ...network1 }));
        store.dispatch(Network.set({ id: network1.networkId, key: 'web3Sender', value: web3Sender }));

        const selected1 = Contract.selectByIdSingle(store.getState(), contract1Id)!;
        assert.isUndefined(selected1.web3Contract, 'web3Contract');
        assert.isDefined(selected1.web3SenderContract, 'web3SenderContract');
    });
});

import { assert } from 'chai';
import Web3 from 'web3';
import { ContractTransform, NetworkTransform } from './transform';
import { network1, contract1 } from './test/data';
import { StateRoot } from './state';
import { getOrm } from './orm';
import { REDUX_ROOT } from './common';

describe('redux-persist Transforms', () => {
    let state: StateRoot;
    beforeEach(() => {
        state = {
            [REDUX_ROOT]: getOrm().getEmptyState(),
        };
    });

    describe('NetworkTransform', () => {
        it('in()', () => {
            state[REDUX_ROOT]['Network'].items.push(network1.networkId);
            state[REDUX_ROOT]['Network'].itemsById[network1.networkId] = network1;

            const inState = state.web3Redux.Network;
            const outState = NetworkTransform.in(inState, 'Network', state.web3Redux);
            assert.deepEqual(outState, state.web3Redux.Network); //No omitted objects (Web3, Web3.eth.Contract, Sync)
        });
        it('out()', () => {
            state[REDUX_ROOT]['Network'].items.push(network1.networkId);
            state[REDUX_ROOT]['Network'].itemsById[network1.networkId] = network1;

            const outState = state.web3Redux.Network;
            const inState = NetworkTransform.out(outState, 'Network', state.web3Redux);
            assert.deepEqual(inState, state.web3Redux.Network);
        });
        it('in() - web3', () => {
            const web3Rpc = 'ws://localhost:8546';
            const web3 = new Web3(web3Rpc);
            const web3Sender = new Web3(web3Rpc);
            state[REDUX_ROOT]['Network'].items.push(network1.networkId);
            state[REDUX_ROOT]['Network'].itemsById[network1.networkId] = { ...network1, web3Rpc, web3, web3Sender };

            const inState = state.web3Redux.Network;
            const outState = NetworkTransform.in(inState, 'Network', state.web3Redux);
            assert.isUndefined(outState.itemsById[network1.networkId].web3, 'network web3 is dropped');
            assert.isUndefined(outState.itemsById[network1.networkId].web3Sender, 'network web3Sender is dropped');
        });
        it('out() - web3', () => {
            const web3Rpc = 'ws://localhost:8546';
            state[REDUX_ROOT]['Network'].items.push(network1.networkId);
            state[REDUX_ROOT]['Network'].itemsById[network1.networkId] = { ...network1, web3Rpc };

            const outState = state.web3Redux.Network;
            const inState = NetworkTransform.out(outState, 'Network', state.web3Redux);
            assert.isDefined(inState.itemsById[network1.networkId].web3, 'network web3 is rebuilt'); //Rebuilds web3 object
            assert.isUndefined(inState.itemsById[network1.networkId].web3Sender, 'network web3 sender is dropped'); //web3Sender dropped (requires wallet)
        });
    });

    describe('ContractTransform', () => {
        it('in()', () => {
            state[REDUX_ROOT]['Contract'].items.push(contract1.id);
            state[REDUX_ROOT]['Contract'].itemsById[contract1.id] = contract1;

            const inState = state.web3Redux.Contract;
            const outState = ContractTransform.in(inState, 'Contract', state.web3Redux);
            assert.deepEqual(outState, state.web3Redux.Contract); //No omitted objects (Web3, Web3.eth.Contract, Sync)
        });
        it('out()', () => {
            state[REDUX_ROOT]['Contract'].items.push(contract1.id);
            state[REDUX_ROOT]['Contract'].itemsById[contract1.id] = contract1;

            const outState = state.web3Redux.Contract;
            const inState = ContractTransform.out(outState, 'Contract', state.web3Redux);
            assert.deepEqual(inState, state.web3Redux.Contract);
        });
        it('in() - web3Contract', () => {
            const web3Rpc = 'ws://localhost:8546';
            const web3 = new Web3(web3Rpc);
            const web3Contract = new web3.eth.Contract(contract1.abi!);
            const web3SenderContract = new web3.eth.Contract(contract1.abi!);

            state[REDUX_ROOT]['Contract'].items.push(contract1.id);
            state[REDUX_ROOT]['Contract'].itemsById[contract1.id] = { ...contract1, web3Contract, web3SenderContract };

            const inState = state.web3Redux.Contract;
            const outState = ContractTransform.in(inState, 'Contract', state.web3Redux);
            assert.isUndefined(outState.itemsById[contract1.id].web3Contract, 'contract web3Contract is dropped');
            assert.isUndefined(
                outState.itemsById[contract1.id].web3SenderContract,
                'contract web3SenderContract is dropped',
            );
        });
        it('out() - web3Contract', () => {
            state[REDUX_ROOT]['Contract'].items.push(contract1.id);
            state[REDUX_ROOT]['Contract'].itemsById[contract1.id] = { ...contract1 };

            const outState = state.web3Redux.Contract;
            const inState = ContractTransform.out(outState, 'Contract', state.web3Redux);
            assert.isUndefined(
                inState.itemsById[contract1.id].web3Contract,
                'contract web3Contract is dropped (rebuilt in middleware)',
            ); //Rebuilds web3Contract object
            assert.isUndefined(
                inState.itemsById[contract1.id].web3SenderContract,
                'contract web3SenderContract is dropped',
            ); //web3SenderContract is dropped(requires wallet)
        });
    });
});

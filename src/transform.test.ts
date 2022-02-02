import { assert } from 'chai';
import Web3 from 'web3';
import { ContractTransform, NetworkTransform } from './transform';
import { network1, contract1, state } from './test/data';
import { State } from './state';

describe('redux-persist Transforms', () => {
    describe('NetworkTransform', () => {
        it('in()', () => {
            const outState = NetworkTransform.in(state.web3Redux.Network, 'Network', state.web3Redux);
            assert.deepEqual(outState, state.web3Redux.Network); //No omitted objects (Web3, Web3.eth.Contract, Sync)
        });
        it('out()', () => {
            const inState = NetworkTransform.out(state.web3Redux.Network, 'Network', state.web3Redux);
            assert.deepEqual(inState, state.web3Redux.Network);
        });
        it('in() - web3', () => {
            const web3Rpc = 'ws://localhost:8546';
            const inState: State['Network'] = {
                items: [network1.networkId],
                itemsById: {
                    [network1.networkId]: {
                        ...network1,
                        web3Rpc,
                        web3: new Web3(web3Rpc),
                        web3Sender: new Web3(web3Rpc),
                    },
                },
            };
            const stateRaw = {
                Network: inState,
            };
            const outState = NetworkTransform.in(inState, 'Network', stateRaw as State);
            assert.isUndefined(outState.itemsById[network1.networkId].web3, 'network web3 is dropped');
            assert.isUndefined(outState.itemsById[network1.networkId].web3Sender, 'network web3Sender is dropped');
        });
        it('out() - web3', () => {
            const web3Rpc = 'ws://localhost:8546';
            const outState: State['Network'] = {
                items: [network1.networkId],
                itemsById: {
                    [network1.networkId]: {
                        ...network1,
                        web3Rpc,
                    },
                },
            };
            const stateRaw = {
                Network: outState,
            };

            const inState = NetworkTransform.out(outState, 'Network', stateRaw as State);
            assert.isDefined(inState.itemsById[network1.networkId].web3, 'network web3 is rebuilt'); //Rebuilds web3 object
            assert.isUndefined(inState.itemsById[network1.networkId].web3Sender, 'network web3 sender is dropped'); //web3Sender dropped (requires wallet)
        });
    });

    describe('ContractTransform', () => {
        it('in()', () => {
            const outState = ContractTransform.in(state.web3Redux.Contract, 'Contract', state.web3Redux);
            assert.deepEqual(outState, state.web3Redux.Contract); //No omitted objects (Web3, Web3.eth.Contract, Sync)
        });
        it('out()', () => {
            const inState = ContractTransform.out(state.web3Redux.Contract, 'Contract', state.web3Redux);
            assert.deepEqual(inState, state.web3Redux.Contract);
        });
        it('in() - web3Contract', () => {
            const web3Rpc = 'ws://localhost:8546';
            const web3 = new Web3(web3Rpc);
            const web3Contract = new web3.eth.Contract(contract1.abi!);
            const web3SenderContract = new web3.eth.Contract(contract1.abi!);
            const inState: State['Contract'] = {
                items: [contract1.id],
                itemsById: {
                    [contract1.id]: {
                        ...contract1,
                        web3Contract,
                        web3SenderContract,
                    },
                },
                indexes: {
                    networkId: {
                        [contract1.networkId]: [contract1.networkId],
                    },
                },
            };
            const stateRaw = {
                Contract: inState,
            };
            const outState = ContractTransform.in(inState, 'Contract', stateRaw as State);
            assert.isUndefined(outState.itemsById[contract1.id].web3Contract, 'contract web3Contract is dropped');
            assert.isUndefined(
                outState.itemsById[contract1.id].web3SenderContract,
                'contract web3SenderContract is dropped',
            );
        });
        it('out() - web3Contract', () => {
            const web3Rpc = 'ws://localhost:8546';
            const web3 = new Web3(web3Rpc);
            const outState: State['Contract'] = {
                items: [contract1.id],
                itemsById: {
                    [contract1.id]: {
                        ...contract1,
                    },
                },
                indexes: {
                    networkId: {
                        [contract1.networkId]: [contract1.networkId],
                    },
                },
            };
            const networkState: State['Network'] = {
                items: [network1.networkId],
                itemsById: {
                    [network1.networkId]: {
                        ...network1,
                        web3Rpc,
                        web3, //NetworkTransformer re-built web3
                    },
                },
            };
            const stateRaw = {
                Network: networkState,
                Contract: outState,
            };

            const inState = ContractTransform.out(outState, 'Contract', stateRaw as State);
            assert.isDefined(inState.itemsById[contract1.id].web3Contract, 'contract web3Contract is rebuilt'); //Rebuilds web3Contract object
            assert.isUndefined(
                inState.itemsById[contract1.id].web3SenderContract,
                'contract web3SenderContract is dropped',
            ); //web3SenderContract is dropped(requires wallet)
        });
    });
});

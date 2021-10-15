import Web3 from 'web3';
import { assert } from 'chai';
import { createStore } from '../store';
import { Network, Contract, ContractEvent, EthCall } from '../index';
import { addressList, assertDeepEqual } from '../test/utils';
import BlockNumberAbi from '../abis/BlockNumber.json';
import { BlockNumber, NewValue } from '../types/web3/BlockNumber';
import { setNetworkId } from '../config';

const networkId = '1337';
const web3 = new Web3('http://locahost:8545');
const network = {
    networkId,
    web3,
};

const contract = {
    networkId,
    address: '0x0000000000000000000000000000000000000001',
    abi: BlockNumberAbi.abi as any,
};

describe('contract.actions', () => {
    let store: ReturnType<typeof createStore>;

    beforeEach(() => {
        store = createStore();
        store.dispatch(Network.create(network));
    });

    describe('empty', () => {
        it('selectSingle(state, id) => undefined', async () => {
            const selected = Contract.selectById<BlockNumber>(store.getState(), '');
            assert.equal(selected, undefined);
        });

        it('selectByIdMany(state, [id]) => []', async () => {
            const selected = Contract.selectByIdMany<BlockNumber>(store.getState(), ['']);
            assert.deepEqual(selected, [null]);
        });

        it('selectContractCall(state, id) => undefined', async () => {
            //Types mismatch
            //@ts-expect-error
            const selected1 = Contract.selectContractCallById<BlockNumber, 'xyz'>(store.getState(), '', 'xyz');
            assert.equal(selected1, undefined, 'contract undefined');

            store.dispatch(Contract.create({ ...contract }));

            const contractId = Contract.contractId(contract);
            //@ts-expect-error
            const selected2 = Contract.selectContractCallById<BlockNumber, 'xyz'>(store.getState(), contractId, 'xyz');
            assert.equal(selected2, undefined, 'method undefined');

            const selected3 = Contract.selectContractCallById<BlockNumber, 'blockNumber'>(
                store.getState(),
                contractId,
                'blockNumber',
            );
            assert.equal(selected3, undefined, 'argsHash undefined');
        });

        it('selectEventsFiltered(state, id) => undefined', async () => {
            const selected1 = Contract.selectContractEventsByIdFiltered(store.getState(), '', 'NewValue');
            assert.equal(selected1, undefined, 'contract undefined');

            store.dispatch(Contract.create({ ...contract }));

            const contractId = Contract.contractId(contract);
            const selected2 = Contract.selectContractEventsByIdFiltered(store.getState(), contractId, 'XYZEvent');
            assert.deepEqual(selected2, [], 'no events');
        });
    });

    describe('1 contract', () => {
        let contract1: Contract.ContractPartial;
        let contract1Validated: Contract.Contract;
        let contract1Id: string;
        let contract1Address: string;

        beforeEach(() => {
            contract1Address = addressList[0];
            contract1 = {
                networkId,
                address: contract1Address,
                abi: BlockNumberAbi.abi as any[],
            };
            contract1Validated = Contract.validatedContract(contract1);
            contract1Id = Contract.contractId(contract1);
            store.dispatch(Contract.create(contract1));
        });

        it('state.itemsById', () => {
            //State
            assertDeepEqual(
                store.getState().web3Redux['Contract'].itemsById[contract1Validated.id!],
                contract1Validated,
                ['web3Contract', 'web3SenderContract'],
                'state.web3Redux.Contract.itemsById',
            );
        });

        it('selectSingle(state, id)', async () => {
            const selected1 = Contract.selectByIdSingle(store.getState(), contract1Id);
            assert.deepEqual(
                { ...selected1!, web3Contract: undefined, web3SenderContract: undefined },
                { ...contract1Validated, web3Contract: undefined, web3SenderContract: undefined },
                'equal deep values',
            );
        });

        it('selectSingleAtAddress(state, address)', async () => {
            store.dispatch(setNetworkId(networkId));

            const selected1 = Contract.selectByAddressSingle(store.getState(), contract1Address);
            assert.deepEqual(
                { ...selected1!, web3Contract: undefined, web3SenderContract: undefined },
                { ...contract1Validated, web3Contract: undefined, web3SenderContract: undefined },
                'equal deep values',
            );
        });

        it('selectByIdMany(state, [id])', async () => {
            assertDeepEqual(
                Contract.selectByIdMany(store.getState(), [contract1Validated.id!]),
                [contract1Validated],
                ['web3Contract', 'web3SenderContract'],
                'Contract.select([id])',
            );
            assertDeepEqual(
                Contract.selectByIdMany(store.getState()),
                [contract1Validated],
                ['web3Contract', 'web3SenderContract'],
                'Contract.select()',
            );
        });

        it('selectContractCallById(state, id)', async () => {
            const methodAbi = contract1.abi.filter((f) => f.name === 'getValue')[0];
            const data = web3.eth.abi.encodeFunctionCall(methodAbi, []);
            const ethCall1 = EthCall.validatedEthCall({ networkId, from: addressList[2], to: addressList[3], data });
            const argsHash = Contract.callArgsHash();

            contract1Validated.methods['getValue'][argsHash] = { ethCallId: ethCall1.id, sync: false };
            store.dispatch(Contract.create(contract1Validated)); //update call index

            store.dispatch(EthCall.create(ethCall1));
            const selectedCall1 = Contract.selectContractCallById<BlockNumber, 'getValue'>(
                store.getState(),
                contract1Id,
                'getValue',
            );
            assert.equal(selectedCall1, undefined, 'call not undefined');

            store.dispatch(
                EthCall.create({
                    ...ethCall1,
                    returnValue: '42',
                }),
            );
            const selectedCall2 = Contract.selectContractCallById<BlockNumber, 'getValue'>(
                store.getState(),
                contract1Id,
                'getValue',
            );
            assert.equal(selectedCall2, '42', 'invalid decoding');
        });

        it('selectContractCallByAddress(state, address)', async () => {
            store.dispatch(setNetworkId(networkId));

            const methodAbi = contract1.abi.filter((f) => f.name === 'getValue')[0];
            const data = web3.eth.abi.encodeFunctionCall(methodAbi, []);
            const ethCall1 = EthCall.validatedEthCall({ networkId, from: addressList[2], to: addressList[3], data });
            const argsHash = Contract.callArgsHash();

            contract1Validated.methods['getValue'][argsHash] = { ethCallId: ethCall1.id, sync: false };
            store.dispatch(Contract.create(contract1Validated)); //update call index

            store.dispatch(EthCall.create(ethCall1));
            const selectedCall1 = Contract.selectContractCallByAddress<BlockNumber, 'getValue'>(
                store.getState(),
                contract1Address,
                'getValue',
            );
            assert.equal(selectedCall1, undefined, 'call not undefined');

            store.dispatch(
                EthCall.create({
                    ...ethCall1,
                    returnValue: '42',
                }),
            );
            const selectedCall2 = Contract.selectContractCallByAddress<BlockNumber, 'getValue'>(
                store.getState(),
                contract1Address,
                'getValue',
            );
            assert.equal(selectedCall2, '42', 'invalid decoding');
        });

        describe('selectEventsFiltered', () => {
            let eventPartial1: ContractEvent.PartialContractEvent<NewValue>;
            let eventPartial2: ContractEvent.PartialContractEvent;
            let event1: ContractEvent.ContractEvent<NewValue>;
            //let event2: ContractEvent.ContractEvent;

            beforeEach(() => {
                eventPartial1 = {
                    networkId,
                    address: contract.address,
                    name: 'NewValue',
                    blockHash: '0x0',
                    logIndex: 0,
                    returnValues: { val: 42 },
                } as unknown as ContractEvent.PartialContractEvent<NewValue>;
                eventPartial2 = {
                    networkId,
                    address: contract.address,
                    name: 'UpdateValue',
                    blockHash: '0x0',
                    logIndex: 1,
                    returnValues: { val: 42 },
                } as unknown as ContractEvent.PartialContractEvent;
                event1 = ContractEvent.validatedContractEvent(eventPartial1);
                //event2 = ContractEvent.validatedContractEvent(eventPartial2);
                store.dispatch(Contract.create(contract));
                store.dispatch(ContractEvent.create(eventPartial1));
                store.dispatch(ContractEvent.create(eventPartial2));
            });

            it('(state, id) => [event]', async () => {
                const contractId = Contract.contractId(contract);
                const selected1 = Contract.selectContractEventsByIdFiltered<BlockNumber, 'NewValue', NewValue>(
                    store.getState(),
                    contractId,
                    'NewValue',
                );
                assert.deepEqual(selected1, [event1], 'selected1 == [event1]');

                //Same reference, ORM selector tracks changes to ContractEvent slice
                const selected2 = Contract.selectContractEventsByIdFiltered(store.getState(), contractId, 'NewValue');
                assert.equal(selected2, selected1, 'selected2 === selected1');
            });

            it('(state, id, filter) => [event]', async () => {
                const selected1 = Contract.selectContractEventsByIdFiltered(store.getState(), contract1Id, 'NewValue', {
                    val: 42,
                });
                assert.deepEqual(selected1, [event1], 'events');

                const selected2 = Contract.selectContractEventsByIdFiltered(store.getState(), contract1Id, 'NewValue', {
                    val: 43,
                });
                assert.deepEqual(selected2, [], 'events');

                //Same reference, weakMemo tracks changes in named events and returns same reference
                const selected3 = Contract.selectContractEventsByIdFiltered(store.getState(), contract1Id, 'NewValue', {
                    val: 42,
                });
                assert.equal(selected3, selected1, 'selected3 === selected1');
            });

            it('AtAddress(state, address, filter) => [event]', async () => {
                store.dispatch(setNetworkId(networkId));

                const selected1 = Contract.selectContractEventsByAddressFiltered(
                    store.getState(),
                    contract1Address,
                    'NewValue',
                    {
                        val: 42,
                    },
                );
                assert.deepEqual(selected1, [event1], 'events');

                const selected2 = Contract.selectContractEventsByAddressFiltered(
                    store.getState(),
                    contract1Address,
                    'NewValue',
                    {
                        val: 43,
                    },
                );
                assert.deepEqual(selected2, [], 'events');
            });
        });
    });
});

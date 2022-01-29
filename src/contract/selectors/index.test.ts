import { assert } from 'chai';
import { AbiCoder } from 'web3-eth-abi';
import Web3 from 'web3';
import BlockNumberAbi from '../../abis/BlockNumber.json';
import { event1, event2, transaction1, transaction2 } from '../../test/data';
import { REDUX_ROOT } from '../../common';
import { getOrm } from '../../orm';

import { Contract, validate } from '../model/interface';
import { name } from '../common';

import { selectByIdSingle, selectByIdMany, selectByFilter, selectContractCall } from './index';
import { validateEthCall } from '../../ethcall/model';
import { ZERO_ADDRESS } from '../../utils';
import { StateRoot } from '../../state';
import { ModelWithId } from '../../types/model';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const coder: AbiCoder = require('web3-eth-abi');

describe(`${name}.selectors`, () => {
    const web3 = new Web3('https://localhost:8545');
    const networkId = '1337';
    const ADDRESS_1 = '0x0000000000000000000000000000000000000001';
    //EthCall
    const method = 'getValue';
    const methodAbi = (BlockNumberAbi.abi as any).filter((f: any) => f.name === method)[0];
    const data = coder.encodeFunctionCall(methodAbi, []);
    const ethCall = validateEthCall({ networkId, from: ZERO_ADDRESS, to: ADDRESS_1, data, returnValue: 66 });

    //Contract
    const address = ADDRESS_1;
    const contract: ModelWithId<Contract> = validate({
        networkId,
        address,
    });

    const id = { networkId, address: ADDRESS_1 };
    const contractWithORM = {
        id: contract.id,
        networkId,
        address,
        fromTransactions: [transaction1],
        toTransactions: [transaction2],
    };

    const state: StateRoot = {
        [REDUX_ROOT]: getOrm().getEmptyState(),
    };

    before(() => {
        state[REDUX_ROOT]['Contract'].items.push(contract.id);
        state[REDUX_ROOT]['Contract'].itemsById[contract.id] = contract;

        //Set Eth Call
        state[REDUX_ROOT]['EthCall'].items.push(ethCall.id);
        state[REDUX_ROOT]['EthCall'].itemsById[ethCall.id!] = ethCall;

        //Set Event
        state[REDUX_ROOT]['ContractEvent'].items.push(event1.id);
        state[REDUX_ROOT]['ContractEvent'].itemsById[event1.id!] = event1;
        state[REDUX_ROOT]['ContractEvent'].items.push(event2.id);
        state[REDUX_ROOT]['ContractEvent'].itemsById[event2.id!] = event2;

        //Set Transactions
        state[REDUX_ROOT]['Transaction'].items.push(transaction1.id);
        state[REDUX_ROOT]['Transaction'].itemsById[transaction1.id!] = transaction1;
        state[REDUX_ROOT]['Transaction'].items.push(transaction2.id);
        state[REDUX_ROOT]['Transaction'].itemsById[transaction2.id!] = transaction2;

        state[REDUX_ROOT]['Transaction'].indexes.fromId[contract.id] = [transaction1.id];
        state[REDUX_ROOT]['Transaction'].indexes.toId[contract.id] = [transaction2.id];
    });

    describe('selectByIdSingle', () => {
        it('(id)', () => {
            const selected = selectByIdSingle(state, id);
            assert.deepEqual(selected, contractWithORM);
        });
        it('memoization', () => {
            const select1 = selectByIdSingle(state, id);
            const select2 = selectByIdSingle(state, id);
            assert.deepEqual(select1, contractWithORM);
            assert.equal(select1, select2);
        });
    });

    describe('selectByIdMany', () => {
        it('()', () => {
            assert.deepEqual(selectByIdMany(state), [contractWithORM]);
        });
        it('([id])', () => {
            assert.deepEqual(selectByIdMany(state), [contractWithORM]);
        });
        //TODO: Fix memoization due to ORM relationships
        it.skip('memoization', () => {
            const select1 = selectByIdMany(state, [id]);
            const select2 = selectByIdMany(state, [id]);
            assert.deepEqual(select1, select2);
            assert.equal(select1, select2);
        });
    });
    describe('selectByFilter', () => {
        it('(undefined)', () => {
            assert.deepEqual(selectByFilter(state, undefined), [contract]);
        });
        it('({networkId})', () => {
            assert.deepEqual(selectByFilter(state, { networkId: contract.networkId }), [contract]);
            assert.deepEqual(selectByFilter(state, { networkId: 'xzy' }), []);
        });
        it('memoization', () => {
            const select1 = selectByFilter(state, { networkId: contract.networkId });
            const select2 = selectByFilter(state, { networkId: contract.networkId });
            assert.deepEqual(select1, select2);
            assert.equal(select1, select2);
        });
    });
    describe('selectContractCall', () => {
        const abi = BlockNumberAbi.abi as any;
        const web3Contract = new web3.eth.Contract(abi, address);

        before(() => {
            //Set web3 Instance
            //@ts-expect-error
            contract.abi = abi;
            //@ts-expect-error
            contract.web3Contract = web3Contract;
        });

        it(method, () => {
            assert.deepEqual(selectContractCall(state, id, method), ethCall.returnValue);
        });
    });
});

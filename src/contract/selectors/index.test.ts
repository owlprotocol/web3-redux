import { assert } from 'chai';
import { AbiCoder } from 'web3-eth-abi';
import Web3 from 'web3';
import BlockNumberAbi from '../../abis/BlockNumber.json';
import { REDUX_ROOT } from '../../common';
import { getOrm } from '../../orm';

import { getId, Contract, validate } from '../model/interface';
import { name } from '../common';

import { selectByIdExists, selectByIdSingle, selectByIdMany, selectByFilter, selectContractCall } from './index';
import { validateEthCall } from '../../ethcall/model';
import { ZERO_ADDRESS } from '../../utils';
import { validateContractEvent } from '../../contractevent/model';
import { StateRoot } from '../../state';

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

    //Events
    const event1 = validateContractEvent({
        networkId,
        address: ADDRESS_1,
        name: 'NewValue',
        blockHash: '0x0',
        logIndex: 0,
        returnValues: { val: 42 },
    });

    const event2 = validateContractEvent({
        networkId,
        address: ADDRESS_1,
        name: 'NewValue',
        blockHash: '0x0',
        logIndex: 1,
        returnValues: { val: 43 },
    });

    //Contract
    const item: Contract = {
        networkId,
        address: ADDRESS_1,
        abi: BlockNumberAbi.abi as any,
        web3Contract: new web3.eth.Contract(BlockNumberAbi.abi as any, ADDRESS_1),
    };

    const id = { networkId, address: ADDRESS_1 };
    const itemWithId = validate(item);

    const state: StateRoot = {
        [REDUX_ROOT]: getOrm().getEmptyState(),
    };

    before(() => {
        state[REDUX_ROOT][name].items.push(getId(id));
        state[REDUX_ROOT][name].itemsById[getId(id)] = itemWithId;

        //Set Eth Call
        //@ts-ignore
        state[REDUX_ROOT]['EthCall'].items.push(ethCall.id);
        state[REDUX_ROOT]['EthCall'].itemsById[ethCall.id!] = ethCall;

        //Set Event
        //@ts-ignore
        state[REDUX_ROOT]['ContractEvent'].items.push(event1.id);
        state[REDUX_ROOT]['ContractEvent'].itemsById[event1.id!] = event1;
        //@ts-ignore
        state[REDUX_ROOT]['ContractEvent'].items.push(event2.id);
        state[REDUX_ROOT]['ContractEvent'].itemsById[event2.id!] = event2;
    });

    it('selectByIdExists', () => {
        assert.isTrue(selectByIdExists(state, id));
    });
    describe('selectByIdSingle', () => {
        it('(id)', () => {
            const selected = selectByIdSingle(state, id);
            assert.deepEqual(selected, itemWithId);
        });
        it('memoization', () => {
            const select1 = selectByIdSingle(state, id);
            const select2 = selectByIdSingle(state, id);
            assert.deepEqual(select1, select2);
            assert.equal(select1, select2);
        });
    });

    describe('selectByIdMany', () => {
        it('()', () => {
            assert.deepEqual(selectByIdMany(state), [itemWithId]);
        });
        it('([id])', () => {
            assert.deepEqual(selectByIdMany(state), [itemWithId]);
        });
        it('memoization', () => {
            const select1 = selectByIdMany(state, [id]);
            const select2 = selectByIdMany(state, [id]);
            assert.deepEqual(select1, select2);
            assert.equal(select1, select2);
        });
    });
    describe('selectByFilter', () => {
        it('(undefined)', () => {
            assert.deepEqual(selectByFilter(state, undefined), [itemWithId]);
        });
        it('({networkId})', () => {
            assert.deepEqual(selectByFilter(state, { networkId: item.networkId }), [itemWithId]);
            assert.deepEqual(selectByFilter(state, { networkId: 'xzy' }), []);
        });
        it('memoization', () => {
            const select1 = selectByFilter(state, { networkId: item.networkId });
            const select2 = selectByFilter(state, { networkId: item.networkId });
            assert.deepEqual(select1, select2);
            assert.equal(select1, select2);
        });
    });
    describe('selectContractCall', () => {
        it(method, () => {
            console.debug(state[REDUX_ROOT]['EthCall']);
            assert.deepEqual(selectContractCall(state, id, method), ethCall.returnValue);
        });
    });
});

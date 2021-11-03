import { assert } from 'chai';
import { AbiCoder } from 'web3-eth-abi';
import BlockNumberAbi from '../../abis/BlockNumber.json';
import { REDUX_ROOT } from '../../common';
import { orm } from '../../orm';

import { getId, getIdDeconstructed, InterfacePartial, validate } from '../model/interface';
import { name } from '../common';

import {
    selectByIdExists,
    selectByIdSingle,
    selectByIdMany,
    selectByFilter,
    selectContractCall,
    selectContractEvents,
} from './index';
import { validatedEthCall } from '../../ethcall/model';
import { ZERO_ADDRESS } from '../../utils';
import { callArgsHash } from '../model/callArgs';
import { PartialContractEvent, validatedContractEvent } from '../../contractevent';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const coder: AbiCoder = require('web3-eth-abi');

describe(`${name}.selectors`, () => {
    const networkId = '1337';
    const item: InterfacePartial = {
        networkId,
        address: '0x0000000000000000000000000000000000000001',
        abi: BlockNumberAbi.abi as any,
    };

    const id = getId(item);
    const itemWithId = validate(item);
    const idDeconstructed = getIdDeconstructed(item);

    //EthCall
    const method = 'getValue';
    const methodAbi = itemWithId.abi.filter((f) => f.name === method)[0];
    const data = coder.encodeFunctionCall(methodAbi, []);
    const ethCall = validatedEthCall({ networkId, from: ZERO_ADDRESS, to: itemWithId.address, data });

    //Events
    const eventName = 'NewValue';
    const event1 = validatedContractEvent({
        networkId,
        address: itemWithId.address,
        name: 'NewValue',
        blockHash: '0x0',
        logIndex: 0,
        returnValues: { val: 42 },
    } as unknown as PartialContractEvent);

    const event2 = validatedContractEvent({
        networkId,
        address: itemWithId.address,
        name: 'NewValue',
        blockHash: '0x0',
        logIndex: 0,
        returnValues: { val: 43 },
    } as unknown as PartialContractEvent);

    const state = {
        [REDUX_ROOT]: orm.getEmptyState(),
    };

    before(() => {
        state[REDUX_ROOT][name].items.push(id);
        state[REDUX_ROOT][name].itemsById[id] = itemWithId;

        //Set Eth Call
        state[REDUX_ROOT]['EthCall'].items.push(ethCall.id);
        state[REDUX_ROOT]['EthCall'].itemsById[ethCall.id!] = ethCall;

        //Set Event
        state[REDUX_ROOT]['ContractEvent'].items.push(event1.id);
        state[REDUX_ROOT]['ContractEvent'].itemsById[event1.id] = event1;
        state[REDUX_ROOT]['ContractEvent'].items.push(event2.id);
        state[REDUX_ROOT]['ContractEvent'].itemsById[event2.id] = event2;

        const argsHash = callArgsHash(); //empty args
        itemWithId.methods['getValue'][argsHash] = { ethCallId: ethCall.id };
    });

    it('selectByIdExists', () => {
        assert.isTrue(selectByIdExists(state, id));
        assert.isTrue(selectByIdExists(state, idDeconstructed));
    });
    describe('selectByIdSingle', () => {
        it('(id)', () => {
            const selected = selectByIdSingle(state, id);
            assert.deepEqual(selected, itemWithId);
        });
        it('(idDeconstructed', () => {
            const selected = selectByIdSingle(state, idDeconstructed);
            assert.deepEqual(selected, itemWithId);
        });
        it('memoization', () => {
            const select1 = selectByIdSingle(state, id);
            const select2 = selectByIdSingle(state, idDeconstructed);
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
        it('([idDeconstructed])', () => {
            assert.deepEqual(selectByIdMany(state, [id]), [itemWithId]);
        });
        it('memoization', () => {
            const select1 = selectByIdMany(state, [id]);
            const select2 = selectByIdMany(state, [idDeconstructed]);
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
            assert.deepEqual(selectContractCall(state, id, method), ethCall);
        });
    });
    describe('selectContractEvents', () => {
        it(eventName, () => {
            assert.deepEqual(selectContractEvents(state, id, eventName), [event1, event2]);
            assert.deepEqual(selectContractEvents(state, id, eventName, { val: 42 }), [event1]);
        });
    });
});

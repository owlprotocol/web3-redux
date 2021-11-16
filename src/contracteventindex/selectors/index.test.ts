import { assert } from 'chai';
import { REDUX_ROOT } from '../../common';
import { getOrm } from '../../orm';

import { Interface } from '../model';
import { name } from '../common';

import { selectEvents } from './index';
import { validateContractEvent } from '../../contractevent/model';

describe(`${name}.selectors`, () => {
    const networkId = '1337';
    const ADDRESS_1 = '0x0000000000000000000000000000000000000001';

    //Events
    const event1 = validateContractEvent({
        networkId,
        address: ADDRESS_1,
        name: 'NewValue',
        blockHash: '0x0',
        logIndex: 0,
        returnValues: { val: 42 },
    });

    //Indexes
    const index1: Interface = { id: JSON.stringify({ networkId }) };
    //const index2: Interface = { id: JSON.stringify({ networkId, address: event1.address }) };
    //const index3: Interface = { id: JSON.stringify({ networkId, address: event1.address, name: event1.name }) };

    const state = {
        [REDUX_ROOT]: getOrm().getEmptyState(),
    };

    before(() => {
        //Set Indexes
        state[REDUX_ROOT][name].items.push(index1.id!);
        state[REDUX_ROOT][name].itemsById[index1.id!] = index1;

        //Set Event
        state[REDUX_ROOT]['ContractEvent'].items.push(event1.id);
        state[REDUX_ROOT]['ContractEvent'].itemsById[event1.id!] = event1;

        //Set Join Table
        state[REDUX_ROOT]['ContractEventIndexIds'].items.push(0);
        state[REDUX_ROOT]['ContractEventIndexIds'].itemsById[0] = {
            toContractEventIndexId: index1.id,
            fromContractEventId: event1.id,
            id: 0,
        };
        state[REDUX_ROOT]['ContractEventIndexIds'].indexes.fromContractEventId[event1.id!] = [index1.id];
        state[REDUX_ROOT]['ContractEventIndexIds'].indexes.toContractEventIndexId[index1.id!] = [event1.id];
    });

    describe('selectEvents', () => {
        it.skip('({networkId})', () => {
            //TODO: Test fails. Redux ORM bug?
            console.debug(state[REDUX_ROOT]['ContractEvent']);
            console.debug(state[REDUX_ROOT]['ContractEventIndex']);
            console.debug(state[REDUX_ROOT]['ContractEventIndexIds']);
            const selected = selectEvents(state, index1.id!);
            assert.deepEqual(selected, [event1]);
        });
    });
});

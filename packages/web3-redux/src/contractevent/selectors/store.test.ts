import { assert } from 'chai';
import { create as createEvent } from './../actions/index.js';
import { createStore, StoreType } from '../../store.js';

import { validateContractEvent } from '../model/index.js';
import { name } from '../../contract/common.js';
import { networkId } from '../../test/data.js';

import { selectContractEvents } from '../../contract/selectors/index.js';

describe(`${name}.selectors`, () => {
    let store: StoreType;

    const ADDRESS_1 = '0x0000000000000000000000000000000000000001';
    const contractId = { networkId, address: ADDRESS_1 };

    //Events
    const eventName = 'NewValue';
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

    beforeEach(() => {
        ({ store } = createStore());
    });

    describe('selectContractEvents', () => {
        it('returnValuesIndexKeys = undefined', () => {
            assert.equal(event1.indexIds!.length, 2); //contractIndex, eventIndex

            store.dispatch(createEvent(event1));
            store.dispatch(createEvent(event2));
            const state = store.getState();

            assert.deepEqual(selectContractEvents(state, contractId, eventName), [event1, event2]);
            assert.deepEqual(selectContractEvents(state, contractId, eventName, { val: 42 }), [event1]);
        });

        it('returnValuesIndexKeys = [val]', () => {
            const event1Indexed = validateContractEvent({ ...event1, returnValuesIndexKeys: ['val'] });
            const event2Indexed = validateContractEvent({ ...event2, returnValuesIndexKeys: ['val'] });
            assert.equal(event1Indexed.indexIds!.length, 3);

            store.dispatch(createEvent(event1Indexed));
            store.dispatch(createEvent(event2Indexed));
            const state = store.getState();

            assert.deepEqual(selectContractEvents(state, contractId, eventName), [event1Indexed, event2Indexed]);
            assert.deepEqual(selectContractEvents(state, contractId, eventName, { val: 42 }), [event1Indexed]);
        });

        it('returnValuesIndexKeys = true', () => {
            const event1Indexed = validateContractEvent({ ...event1, returnValuesIndexKeys: true });
            const event2Indexed = validateContractEvent({ ...event2, returnValuesIndexKeys: true });
            assert.equal(event1Indexed.indexIds!.length, 3);

            store.dispatch(createEvent(event1Indexed));
            store.dispatch(createEvent(event2Indexed));
            const state = store.getState();

            assert.deepEqual(selectContractEvents(state, contractId, eventName), [event1Indexed, event2Indexed]);
            assert.deepEqual(selectContractEvents(state, contractId, eventName, { val: 42 }), [event1Indexed]);
        });
    });
});

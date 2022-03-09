import { assert } from 'chai';
import { name } from './common';
import { selectEvents } from './selectors/index';
import { createStore, StoreType } from '../store';
import { networkId } from '../test/data';
import { create as createEvent } from '../contractevent/actions';
import { validateContractEvent } from '../contractevent';

describe(`${name}.integration`, () => {
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

    const event2 = validateContractEvent({
        networkId,
        address: ADDRESS_1,
        name: 'NewValue',
        blockHash: '0x0',
        logIndex: 1,
        returnValues: { val: 42, val2: 69 },
    });

    //Indexes
    let store: StoreType;

    beforeEach(() => {
        ({ store } = createStore());
    });

    describe('selectors', () => {
        it('selectEvents({networkId,address,name})', () => {
            store.dispatch(createEvent(event1));
            const selected1 = selectEvents(
                store.getState(),
                JSON.stringify({ networkId, address: ADDRESS_1, name: 'NewValue' }),
            );
            assert.deepEqual(selected1, [event1], 'select [event1]');
        });

        it('selectEvents({networkId,address,name,returnValues}', () => {
            const event1Indexed = validateContractEvent({ ...event1, returnValuesIndexKeys: ['val'] });
            const event2Indexed = validateContractEvent({ ...event2, returnValuesIndexKeys: ['val', 'val2'] });

            store.dispatch(createEvent(event1Indexed));
            store.dispatch(createEvent(event2Indexed));
            const selected1 = selectEvents(
                store.getState(),
                JSON.stringify({ networkId, address: ADDRESS_1, name: 'NewValue', returnValues: { val: 42 } }),
            );
            assert.deepEqual(selected1, [event1Indexed, event2Indexed], 'select [event1,event2]');
            const selected2 = selectEvents(
                store.getState(),
                JSON.stringify({
                    networkId,
                    address: ADDRESS_1,
                    name: 'NewValue',
                    returnValues: { val: 42, val2: 69 },
                }),
            );
            assert.deepEqual(selected2, [event2Indexed], 'select [event2]');
        });

        it('selectEvents - memoization', () => {
            store.dispatch(createEvent(event2));
            const selected1 = selectEvents(
                store.getState(),
                JSON.stringify({
                    networkId,
                    address: ADDRESS_1,
                    name: 'NewValue',
                    returnValues: { val2: 69 },
                }),
            );

            store.dispatch(createEvent(event1)); //Created event does not modify index
            const selected2 = selectEvents(
                store.getState(),
                JSON.stringify({
                    networkId,
                    address: ADDRESS_1,
                    name: 'NewValue',
                    returnValues: { val2: 69 },
                }),
            );

            assert.equal(selected1, selected2);
        });
    });
});

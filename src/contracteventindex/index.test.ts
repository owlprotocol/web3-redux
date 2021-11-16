import { assert } from 'chai';
import { createStore, StoreType } from '../store';
import { name } from './common';
import { create as createEvent } from '../contractevent/actions';
import { validateContractEvent } from '../contractevent';

import { selectEvents } from './selectors/index';

describe(`${name}.integration`, () => {
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
    let store: StoreType;

    beforeEach(() => {
        store = createStore();
    });

    describe('selectors', () => {
        it('selectEvents', () => {
            store.dispatch(createEvent(event1));
            assert.isAbove(event1.indexIds!.length, 0);
            event1.indexIds?.forEach((index) => {
                const selected1 = selectEvents(store.getState(), index);
                assert.deepEqual(selected1, [event1]);
            });
        });
    });
});

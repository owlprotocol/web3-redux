import { assert } from 'chai';
import { name } from './common.js';
import { selectContracts } from './selectors/index.js';
import { createStore, StoreType } from '../store.js';
import { networkId, contract1, contract2 } from '../test/data.js';
import { create as createContract } from '../contract/actions/index.js';
import { validateContractEvent } from '../contractevent/index.js';

describe(`${name}.integration`, () => {
    const ADDRESS_1 = '0x0000000000000000000000000000000000000001';

    //Indexes
    let store: StoreType;

    beforeEach(() => {
        ({ store } = createStore());
    });

    describe('selectors', () => {
        it('selectContracts({networkId,address,name})', () => {
            store.dispatch(createContract(contract1));
            const selected1 = selectContracts(
                store.getState(),
                JSON.stringify({ networkId, address: ADDRESS_1, name: 'NewValue' }),
            );
            assert.deepEqual(selected1, [contract1], 'select [contract1]');
        });

        it('selectContracts({networkId,address,name,returnValues}', () => {
            store.dispatch(createContract(contract1));
            store.dispatch(createContract(contract2));
            const selected1 = selectContracts(
                store.getState(),
                JSON.stringify({ networkId, address: ADDRESS_1, name: 'NewValue', returnValues: { val: 42 } }),
            );
            assert.deepEqual(selected1, [contract1, contract2], 'select [contract1,contract2]');
            const selected2 = selectContracts(
                store.getState(),
                JSON.stringify({
                    networkId,
                    address: ADDRESS_1,
                    name: 'NewValue',
                    returnValues: { val: 42, val2: 69 },
                }),
            );
            assert.deepEqual(selected2, [contract2], 'select [contract2]');
        });

        it('selectContracts - memoization', () => {
            store.dispatch(createContract(contract2));
            const selected1 = selectContracts(
                store.getState(),
                JSON.stringify({
                    networkId,
                    address: ADDRESS_1,
                    name: 'NewValue',
                    returnValues: { val2: 69 },
                }),
            );

            store.dispatch(createContract(contract1)); //Created event does not modify index
            const selected2 = selectContracts(
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

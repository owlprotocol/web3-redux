import { assert } from 'chai';
import Web3 from 'web3';

import { createStore, StoreType } from '../store';
import { Network, Transaction } from '../index';
import { addressList } from '../test/utils';

const networkId = '1337';
const web3 = new Web3('http://locahost:8545');
const network = {
    networkId,
    web3,
};

describe('transaction.actions', () => {
    let store: StoreType;

    beforeEach(() => {
        store = createStore();
        store.dispatch(Network.create(network));
    });

    describe('selectors:empty', () => {
        it('selectSingle(state, id) => undefined', async () => {
            const selected = Transaction.selectByIdSingle(store.getState(), '');
            assert.equal(selected, undefined);
        });

        it('selectByIdSingle(state, [id]) => []', async () => {
            const selected = Transaction.selectByIdMany(store.getState(), ['']);
            assert.deepEqual(selected, [null]);
        });
    });

    describe('selectors:memoization', () => {
        it('selectSingle(state, id)', async () => {
            //Test payload != selected reference
            const transaction1 = { networkId, hash: '0x1', from: addressList[0], to: addressList[1] };
            const validated1 = Transaction.validatedTransaction(transaction1);
            store.dispatch(Transaction.create(transaction1));
            const selected1 = Transaction.selectByIdSingle(store.getState(), validated1.id!);

            assert.notEqual(selected1, validated1, 'unequal reference');
            assert.deepEqual(selected1, validated1, 'equal deep values');

            //Test selected unchanged after new insert
            const transaction2 = Transaction.validatedTransaction({
                networkId,
                hash: '0x2',
                from: addressList[0],
                to: addressList[1],
            });
            store.dispatch(Transaction.create(transaction2));

            const selected2 = Transaction.selectByIdSingle(store.getState(), validated1.id!);
            assert.equal(selected2, selected1, 'memoized selector');
        });
    });

    describe('selectors:many', () => {
        it('selectMany(state)', async () => {
            const transaction1 = { networkId, hash: '0x1', from: addressList[0], to: addressList[1] };
            const validated1 = Transaction.validatedTransaction(transaction1);
            store.dispatch(Transaction.create(transaction1));

            //State
            const expectedState = { [validated1.id!]: validated1 };
            assert.deepEqual(
                store.getState().web3Redux['Transaction'].itemsById,
                expectedState,
                'state.web3Redux.Transaction.itemsById',
            );

            //Transaction.selectMany
            assert.deepEqual(
                Transaction.selectByIdMany(store.getState(), [validated1.id!]),
                [validated1],
                'select([id])',
            );
            assert.deepEqual(Transaction.selectByIdMany(store.getState()), [validated1], 'Transaction.select()');
        });
    });
});

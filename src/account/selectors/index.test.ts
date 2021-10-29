import { assert } from 'chai';
import { createStore, StoreType } from '../../store';
import { name } from '../common';
import { create } from '../actions';
import { selectByIdExists, selectByIdSingle, selectByIdMany, selectByFilter } from '.';
import { ZERO_ADDRESS } from '../../utils';

describe(`${name}.selectors`, () => {
    let store: StoreType;
    let state: any;
    const john = { networkId: '1', address: ZERO_ADDRESS };
    const johnId = `1-${ZERO_ADDRESS}`;
    const johnIdDeconstructed = { networkId: john.networkId, address: john.address };
    const johnWithId = { id: johnId, ...john };

    beforeEach(() => {
        store = createStore();
        store.dispatch(create(john));
        state = store.getState();
    });
    it('selectByIdExists', () => {
        assert.isTrue(selectByIdExists(state, johnId));
        assert.isTrue(selectByIdExists(state, johnIdDeconstructed));
    });
    describe('selectByIdSingle', () => {
        it('(id)', () => {
            assert.deepEqual(selectByIdSingle(state, johnId), johnWithId);
        });
        it('(idDeconstructed', () => {
            assert.deepEqual(selectByIdSingle(state, johnIdDeconstructed), johnWithId);
        });
        it('memoization', () => {
            const select1 = selectByIdSingle(state, johnId);
            const select2 = selectByIdSingle(state, johnIdDeconstructed);
            assert.deepEqual(select1, select2);
            assert.equal(select1, select2);
        });
    });

    describe('selectByIdMany', () => {
        it('()', () => {
            assert.deepEqual(selectByIdMany(state), [johnWithId]);
        });
        it('([id])', () => {
            assert.deepEqual(selectByIdMany(state), [johnWithId]);
        });
        it('([idDeconstructed])', () => {
            assert.deepEqual(selectByIdMany(state, [johnId]), [johnWithId]);
        });
        it('memoization', () => {
            const select1 = selectByIdMany(state, [johnId]);
            const select2 = selectByIdMany(state, [johnIdDeconstructed]);
            assert.deepEqual(select1, select2);
            assert.equal(select1, select2);
        });
    });
    describe('selectByFilter', () => {
        it('(undefined)', () => {
            assert.deepEqual(selectByFilter(state, undefined), [johnWithId]);
        });
        it('({networkId})', () => {
            assert.deepEqual(selectByFilter(state, { networkId: 'John' }), [johnWithId]);
            assert.deepEqual(selectByFilter(state, { networkId: 'Jance' }), []);
        });
        it('memoization', () => {
            const select1 = selectByFilter(state, { networkId: 'John' });
            const select2 = selectByFilter(state, { networkId: 'John' });
            assert.deepEqual(select1, select2);
            assert.equal(select1, select2);
        });
    });
});

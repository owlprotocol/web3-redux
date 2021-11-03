import { assert } from 'chai';
import { REDUX_ROOT } from '../../common';
import { getOrm } from '../../orm';
import { ZERO_ADDRESS } from '../../utils';

import { name } from '../common';
import Interface from '../model/interface';

import { selectByIdExists, selectByIdSingle, selectByIdMany, selectByFilter } from './index';

describe(`${name}.selectors`, () => {
    const item: Interface = { id: '0', networkId: '1337', account: ZERO_ADDRESS };
    const id = item.id;
    const state = {
        [REDUX_ROOT]: getOrm().getEmptyState(),
    };

    before(() => {
        state[REDUX_ROOT][name].items.push(id);
        state[REDUX_ROOT][name].itemsById[id] = item;
    });

    it('selectByIdExists', () => {
        assert.isTrue(selectByIdExists(state, id));
    });
    describe('selectByIdSingle', () => {
        it('(id)', () => {
            const selected = selectByIdSingle(state, id);
            assert.deepEqual(selected, item);
        });
    });

    describe('selectByIdMany', () => {
        it('()', () => {
            assert.deepEqual(selectByIdMany(state), [item]);
        });
        it('([id])', () => {
            assert.deepEqual(selectByIdMany(state), [item]);
        });
    });
    describe('selectByFilter', () => {
        it('(undefined)', () => {
            assert.deepEqual(selectByFilter(state, undefined), [item]);
        });
        it('({networkId})', () => {
            assert.deepEqual(selectByFilter(state, { networkId: item.networkId }), [item]);
            assert.deepEqual(selectByFilter(state, { networkId: 'xzy' }), []);
        });
        it('memoization', () => {
            const select1 = selectByFilter(state, { networkId: item.networkId });
            const select2 = selectByFilter(state, { networkId: item.networkId });
            assert.deepEqual(select1, select2);
            assert.equal(select1, select2);
        });
    });
});

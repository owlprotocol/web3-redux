import { assert } from 'chai';
import { REDUX_ROOT } from '../../common';
import { orm } from '../../orm';

import { getId, getIdDeconstructed, Interface } from '../model/interface';
import { name } from '../common';

import { selectByIdExists, selectByIdSingle, selectByIdMany, selectByFilter } from '../selectors';
import { ZERO_ADDRESS } from '../../utils';

describe(`${name}.selectors`, () => {
    const item: Interface = { networkId: '1337', address: ZERO_ADDRESS };
    const id = getId(item);
    const itemWithId = { id: id, ...item };
    const idDeconstructed = getIdDeconstructed(item);

    const state = {
        [REDUX_ROOT]: orm.getEmptyState(),
    };

    before(() => {
        state[REDUX_ROOT][name].items.push(id);
        state[REDUX_ROOT][name].itemsById[id] = itemWithId;
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
});

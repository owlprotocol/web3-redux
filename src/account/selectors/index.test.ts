import { assert } from 'chai';
import { REDUX_ROOT } from '../../common';
import { getOrm } from '../../orm';

import { getId, Account } from '../model/interface';
import { name } from '../common';

import { selectByIdSingle, selectByIdMany } from '../selectors';
import { ZERO_ADDRESS } from '../../utils';

describe(`${name}.selectors`, () => {
    const item: Account = { networkId: '1337', address: ZERO_ADDRESS };
    const id = getId(item);
    const itemWithId = { id: id, ...item };

    const state = {
        [REDUX_ROOT]: getOrm().getEmptyState(),
    };

    before(() => {
        state[REDUX_ROOT][name].items.push(id);
        state[REDUX_ROOT][name].itemsById[id] = itemWithId;
    });

    describe('selectByIdSingle', () => {
        it('(id)', () => {
            const selected = selectByIdSingle(state, item);
            assert.deepEqual(selected, itemWithId);
        });
        it('memoization', () => {
            const select1 = selectByIdSingle(state, item);
            const select2 = selectByIdSingle(state, item);
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
            assert.deepEqual(selectByIdMany(state, [item]), [itemWithId]);
        });
        it('memoization', () => {
            const select1 = selectByIdMany(state, [item]);
            const select2 = selectByIdMany(state, [item]);
            assert.deepEqual(select1, select2);
            assert.equal(select1, select2);
        });
    });
});

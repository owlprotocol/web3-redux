import { assert } from 'chai';
import { REDUX_ROOT } from '../../common';
import { getOrm } from '../../orm';

import { Ipfs } from '../model/interface';
import { name } from '../common';

import { selectByIdSingle, selectByIdMany } from '../selectors';
import { IPFS_HELLO_WORLD } from '../../utils';

describe(`${name}.selectors`, () => {
    const item: Ipfs = { contentId: IPFS_HELLO_WORLD };
    const contentId = item.contentId;
    const itemWithId = { id: contentId, ...item };

    const state = {
        [REDUX_ROOT]: getOrm().getEmptyState(),
    };

    before(() => {
        state[REDUX_ROOT][name].items.push(contentId);
        state[REDUX_ROOT][name].itemsById[contentId] = itemWithId;
    });

    describe('selectByIdSingle', () => {
        it('(contentId)', () => {
            const selected = selectByIdSingle(state, contentId);
            console.log('selected', selected);

            assert.deepEqual(selected, itemWithId);
        });
        it('memoization', () => {
            const select1 = selectByIdSingle(state, contentId);
            const select2 = selectByIdSingle(state, contentId);
            assert.deepEqual(select1, select2);
            assert.equal(select1, select2);
        });
    });

    describe('selectByIdMany', () => {
        it('()', () => {
            assert.deepEqual(selectByIdMany(state), [itemWithId]);
        });
        it('([contentId])', () => {
            assert.deepEqual(selectByIdMany(state), [itemWithId]);
        });
        it('memoization', () => {
            const select1 = selectByIdMany(state, [contentId]);
            const select2 = selectByIdMany(state, [contentId]);
            console.log(select1, '\n', select2);

            assert.deepEqual(select1, select2);
            assert.equal(select1, select2);
        });
    });
});

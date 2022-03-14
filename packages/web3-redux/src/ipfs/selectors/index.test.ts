import { assert } from 'chai';
import { REDUX_ROOT } from '../../common.js';
import { getOrm } from '../../orm.js';

import { Ipfs } from '../model/interface.js';
import { name } from '../common.js';

import { selectByIdSingle, selectByIdMany } from '../selectors/index.js';
import { HELLO_WORLD_QMHASH } from '../../test/ipfs.js';

describe(`${name}.selectors`, () => {
    const item: Ipfs = { contentId: HELLO_WORLD_QMHASH };
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
            assert.deepEqual(select1, select2);
            assert.equal(select1, select2);
        });
    });
});

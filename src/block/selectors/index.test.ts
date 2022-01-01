import { assert } from 'chai';
import { REDUX_ROOT } from '../../common';
import { getOrm } from '../../orm';

import { getId, BlockHeader } from '../model';
import { name } from '../common';

import { selectByIdExists, selectByIdSingle, selectByIdMany, selectByFilter } from './index';
import { StateRoot } from '../../state';
import { ModelWithId } from '../../types/model';

describe(`${name}.selectors`, () => {
    const item: BlockHeader = { networkId: '1337', number: 0 };
    const itemWithId: ModelWithId<BlockHeader> = { id: getId(item), ...item };

    const state: StateRoot = {
        [REDUX_ROOT]: getOrm().getEmptyState(),
    };

    before(() => {
        state[REDUX_ROOT][name].items.push(getId(item));
        state[REDUX_ROOT][name].itemsById[getId(item)] = itemWithId;
    });

    it('selectByIdExists', () => {
        assert.isTrue(selectByIdExists(state, item));
    });
    describe('selectByIdSingle', () => {
        it('(item)', () => {
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
        it('([item])', () => {
            assert.deepEqual(selectByIdMany(state), [itemWithId]);
        });
        it('memoization', () => {
            const select1 = selectByIdMany(state, [item]);
            const select2 = selectByIdMany(state, [item]);
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

    //TODO
    /*
    describe('selectSingleTransactions', () => {
        it('(item)', () => {
            const selected = selectSingleTransactions(state, '');
            assert.equal(selected, null);
        });
    })

    it('selectManyTransactions(state, [blockNo]) => [null]', async () => {
        const selected = selectManyTransactions(state, ['']);
        assert.deepEqual(selected, [null]);
    });

    it('selectSingleBlockTransaction(state, blockId) => null', async () => {
        const selected = selectSingleBlockTransaction(state, '');
        assert.equal(selected, null);
    });

    it('selectManyBlockTransaction(state, [blockNo]) => [null]', async () => {
        const selected = selectManyBlockTransaction(state), ['']);
        assert.deepEqual(selected, [null]);
    });
    */
});

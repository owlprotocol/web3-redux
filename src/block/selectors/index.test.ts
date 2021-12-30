import { assert } from 'chai';
import { REDUX_ROOT } from '../../common';
import { getOrm } from '../../orm';

import { getId, BlockHeader } from '../model';
import { name } from '../common';

import { selectByIdExists, selectByIdSingle, selectByIdMany, selectByFilter } from './index';

describe(`${name}.selectors`, () => {
    const item: BlockHeader = { networkId: '1337', number: 0 };
    const id = { ...item };
    const itemWithId: BlockHeader = { id: getId(id), ...item };

    const state = {
        [REDUX_ROOT]: getOrm().getEmptyState(),
    };

    before(() => {
        state[REDUX_ROOT][name].items.push(id);
        state[REDUX_ROOT][name].itemsById[getId(id)] = itemWithId;
    });

    it('selectByIdExists', () => {
        assert.isTrue(selectByIdExists(state, id));
    });
    describe('selectByIdSingle', () => {
        it('(id)', () => {
            const selected = selectByIdSingle(state, id);
            assert.deepEqual(selected, itemWithId);
        });
        it('memoization', () => {
            const select1 = selectByIdSingle(state, id);
            const select2 = selectByIdSingle(state, id);
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
        it('memoization', () => {
            const select1 = selectByIdMany(state, [id]);
            const select2 = selectByIdMany(state, [id]);
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
        it('(id)', () => {
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

import { assert } from 'chai';
import { REDUX_ROOT } from '../../common.js';
import { getOrm } from '../../orm.js';

import { _4ByteSignature } from '../model/interface.js';
import { name } from '../common.js';

import { selectByIdSingle, selectByIdMany } from '../selectors/index.js';

const ApproveSignature = '0x095ea7b3';

describe(`${name}.selectors`, () => {
    const item: _4ByteSignature = { signatureHash: ApproveSignature };
    const id = item.signatureHash;

    const state = {
        [REDUX_ROOT]: getOrm().getEmptyState(),
    };

    before(() => {
        state[REDUX_ROOT][name].items.push(id);
        state[REDUX_ROOT][name].itemsById[id] = item;
    });

    describe('selectByIdSingle', () => {
        it('(id)', () => {
            const selected = selectByIdSingle(state, item.signatureHash);
            assert.deepEqual(selected, item);
        });
        it('memoization', () => {
            const select1 = selectByIdSingle(state, item.signatureHash);
            const select2 = selectByIdSingle(state, item.signatureHash);
            assert.deepEqual(select1, select2);
            assert.equal(select1, select2);
        });
    });

    describe('selectByIdMany', () => {
        it('()', () => {
            assert.deepEqual(selectByIdMany(state), [item]);
        });
        it('([id])', () => {
            assert.deepEqual(selectByIdMany(state, [item.signatureHash]), [item]);
        });
        it('memoization', () => {
            const select1 = selectByIdMany(state, [item.signatureHash]);
            const select2 = selectByIdMany(state, [item.signatureHash]);
            assert.deepEqual(select1, select2);
            assert.equal(select1, select2);
        });
    });
});

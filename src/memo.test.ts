import { assert } from 'chai';
import { memoizeWeak, memoizeReturn } from './memo';

describe('memo', () => {
    describe('memoizeReturn', () => {
        it('array', async () => {
            const item1 = ['1', '2', '3'];
            const item2 = ['1', '2', '3'];
            const item3 = ['1', '2'];
            assert.equal(memoizeReturn(item1), item1, 'cache empty');
            assert.equal(memoizeReturn(item2), item1, 'cache hit, return cached');
            assert.notEqual(memoizeReturn(item2), item2, 'cache hit, cached != input');
            assert.equal(memoizeReturn(item3), item3, 'cache miss');
            assert.equal(memoizeReturn(item2), item1, 'cache re-hit');
        });
    });

    describe('memoizeWeak', () => {
        it('appended(array,x)', async () => {
            const appended = memoizeWeak((array: string[], x: string) => {
                return [...array, x];
            });

            const item1 = ['1', '2', '3'];
            const item2 = appended(item1, '4');
            const item3 = appended(item1, '4');
            assert.equal(item3, item2, 'cache hit');
            assert.notEqual(['1', '2', '3', '4'], item2, 'cache hit, cached != input');

            const item4 = appended(item1, '5');
            assert.notEqual(item4, item2, 'cache miss, different value arg');
            const item5 = appended(['1', '2', '3'], '4');
            assert.notEqual(item5, item2, 'cache miss, different array arg');

            const item6 = appended(item1, '4');
            assert.equal(item6, item2, 'cache re-hit');
        });
    });
});

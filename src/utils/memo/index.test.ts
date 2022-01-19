import { assert } from 'chai';
import memoizeReturn from './memoizeReturn';
import memoizeWeak from './memoWeak';
import memoizeArrayByRef from './memoizeArrayByRef';

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

    describe('memoizeArrayByRef', () => {
        it('array', () => {
            const alice = { name: 'alice' };
            const bob = { name: 'bob' };
            const items1 = [alice, bob];
            const items2 = [alice, bob];

            assert.deepEqual(items1, items2);
            assert.notEqual(items1, items2); //Same nested refs, different arrays

            const items1Memo = memoizeArrayByRef(items1); //initial cache
            assert.deepEqual(items1Memo, items1);
            assert.notEqual(items1Memo, items1, 'items1: input != cached'); //array in cache is different from param

            const items2Memo = memoizeArrayByRef(items2);
            assert.deepEqual(items2Memo, items2);
            assert.notEqual(items2Memo, items2, 'items2: input != cached'); //cache hit, returned items1Memo

            assert.equal(items2Memo, items1Memo, 'cache hit');
        });
    });
});

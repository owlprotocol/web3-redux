import { assert } from 'chai';
import { combination, combinationAll } from './combination.js';

describe('combination', () => {
    it('combination', async () => {
        const arr = [1, 2, 3];
        assert.deepEqual(combination(arr, 0), [[]]);
        assert.deepEqual(combination(arr, 1), [[1], [2], [3]]);
        assert.deepEqual(combination(arr, 2), [
            [1, 2],
            [1, 3],
            [2, 3],
        ]);
        assert.deepEqual(combination(arr, 3), [[1, 2, 3]]);
        assert.deepEqual(combination(arr, 4), []);
    });

    it('combinationAll', async () => {
        const arr = [1, 2, 3];
        assert.deepEqual(combinationAll(arr), [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]);
    });
});

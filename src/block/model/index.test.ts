import { assert } from 'chai';

import { name } from '../common';
import { BlockHeader, BlockId, getId, getIdDeconstructed, validate } from './index';

describe(`${name}.model`, () => {
    const item: BlockHeader = { networkId: '1337', number: 0 };
    const id = `${item.networkId}-${item.number}`;
    const itemWithId: BlockHeader = { id: getId(item), ...item };
    const idDeconstructed: BlockId = { networkId: item.networkId, number: item.number };

    it('getId', () => {
        assert.equal(getId(item), id);
    });
    it('getIdDeconstructed', () => {
        assert.deepEqual(getIdDeconstructed(id), idDeconstructed);
    });
    it('validate', () => {
        assert.deepEqual(validate(item), itemWithId);
    });
});

import { assert } from 'chai';

import { name } from '../common';
import Interface, { InterfacePartial, Id, getId, getIdDeconstructed, validate, IdDeconstructed } from './interface';

describe(`${name}.model`, () => {
    const item: InterfacePartial = { networkId: '1337', number: 0 };
    const id: Id = `${item.networkId}-${item.number}`;
    const itemWithId: Interface = { id, ...item };
    const idDeconstructed: IdDeconstructed = { networkId: item.networkId, number: item.number };

    it('getId', () => {
        assert.equal(getId(item), id);
    });
    it('getIdDeconstructed', () => {
        assert.deepEqual(getIdDeconstructed(id), idDeconstructed);
    });
    it('validate', () => {
        assert.deepEqual(validate(item), itemWithId);
        assert.deepEqual(validate({ id }), itemWithId);
    });
});

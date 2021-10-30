import { assert } from 'chai';
import { ZERO_ADDRESS } from '../../utils';

import { name } from '../common';
import Interface, {
    InterfacePartial,
    Id,
    getId,
    getIdDeconstructed,
    validate,
    IdDeconstructed,
} from '../model/interface';

describe(`${name}.model`, () => {
    const item: InterfacePartial = { networkId: '1337', address: ZERO_ADDRESS };
    const id: Id = `${item.networkId}-${item.address}`;
    const itemWithId: Interface = { id, ...item };
    const idDeconstructed: IdDeconstructed = { networkId: item.networkId, address: item.address };

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

import { assert } from 'chai';
import { ZERO_ADDRESS } from '../../utils';

import { name } from '../common';
import { Account, getId, getIdDeconstructed, validate, AccountId } from '../model/interface';

describe(`${name}.model`, () => {
    const item: Account = { networkId: '1337', address: ZERO_ADDRESS };
    const id = `${item.networkId}-${item.address}`;
    const itemWithId: Account = { id, ...item };
    const idDeconstructed: AccountId = { networkId: item.networkId, address: item.address };

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

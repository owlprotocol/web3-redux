import { assert } from 'chai';
import { ZERO_ADDRESS } from '../../utils';

import { name } from '../common';
import { _4ByteSignature, getId, getIdDeconstructed, validate, SignatureId } from '../model/interface';

describe(`${name}.model`, () => {
    const item: _4ByteSignature = { signatureHash: ZERO_ADDRESS };
    const id = `${item.signatureHash}`;
    const itemWithId: _4ByteSignature = { id, ...item };
    const idDeconstructed: SignatureId = { signatureHash: item.signatureHash };

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

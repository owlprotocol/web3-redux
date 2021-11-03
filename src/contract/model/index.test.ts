import { assert } from 'chai';
import BlockNumberAbi from '../../abis/BlockNumber.json';

import { name } from '../common';
import { Interface, Id, getId, getIdDeconstructed, validate, IdDeconstructed } from '../model/interface';

describe(`${name}.model`, () => {
    const networkId = '1337';
    const item: Interface = {
        networkId,
        address: '0x0000000000000000000000000000000000000001',
        abi: BlockNumberAbi.abi as any,
    };

    const id: Id = `${item.networkId}-${item.address}`;
    const itemWithId: Interface = {
        ...item,
        id,
        methods: {
            blockNumber: {},
            getValue: {},
            setValue: {},
        },
    };
    const idDeconstructed: IdDeconstructed = { networkId: item.networkId, address: item.address };

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

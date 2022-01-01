import { assert } from 'chai';
import BlockNumberAbi from '../../abis/BlockNumber.json';

import { name } from '../common';
import { Contract, getId, validate } from '../model/interface';

describe(`${name}.model`, () => {
    const networkId = '1337';
    const item: Contract = {
        networkId,
        address: '0x0000000000000000000000000000000000000001',
        abi: BlockNumberAbi.abi as any,
    };

    const id = `${item.networkId}-${item.address}`;
    const itemWithId: Contract = {
        ...item,
        id,
    };

    it('getId', () => {
        assert.equal(getId(item), id);
    });
    it('validate', () => {
        assert.deepEqual(validate(item), itemWithId);
    });
});

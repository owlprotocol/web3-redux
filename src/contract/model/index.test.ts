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
        eventAbiBySignature: {
            '0xac3e966f295f2d5312f973dc6d42f30a6dc1c1f76ab8ee91cc8ca5dad1fa60fd': {
                anonymous: false,
                inputs: [
                    {
                        indexed: true,
                        internalType: 'uint256',
                        name: 'value',
                        type: 'uint256',
                    },
                ],
                name: 'NewValue',
                type: 'event',
            },
        },
    };

    it('getId', () => {
        assert.equal(getId(item), id);
    });
    it('validate', () => {
        assert.deepEqual(validate(item), itemWithId);
    });
});

import { assert } from 'chai';
import { create, CREATE, CreateAction, isCreateAction } from './create.js';
import { update, UPDATE, UpdateAction, isUpdateAction } from './update.js';
import { remove, REMOVE, RemoveAction, isRemoveAction } from './remove.js';
import { cloneDeep } from '../../utils/lodash/index.js';
import { BlockNumber as BlockNumberArtifact } from '../../abis/index.js';

import { name } from '../common.js';
import { networkId } from '../../test/data.js';

import { Contract, ContractId } from '../model/interface.js';

describe(`${name}.actions`, () => {
    const address = '0x0000000000000000000000000000000000000001';
    const item: Contract = {
        networkId,
        address,
        abi: cloneDeep(BlockNumberArtifact.abi) as any, //Avoid mutation of abi
    };
    const id: ContractId = { networkId, address };
    const itemWithId = {
        ...item,
        id: `${networkId}-${address}`,
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
            } as any,
        },
    };

    it('create', () => {
        const expected: CreateAction = {
            type: CREATE,
            payload: itemWithId,
            meta: { uuid: '' },
        };
        assert.isTrue(isCreateAction(expected));
        assert.deepEqual(create(item, ''), expected);
    });

    it('update', () => {
        const expected: UpdateAction = {
            type: UPDATE,
            payload: itemWithId,
        };
        assert.isTrue(isUpdateAction(expected));
        assert.deepEqual(update(item), expected);
    });

    it('remove', () => {
        const expected: RemoveAction = {
            type: REMOVE,
            payload: id,
        };
        assert.isTrue(isRemoveAction(expected));
        assert.deepEqual(remove(id), expected);
    });
});

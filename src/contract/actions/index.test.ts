import { assert } from 'chai';
import BlockNumberAbi from '../../abis/BlockNumber.json';

import { name } from '../common';
import { networkId } from '../../test/data';

import { Contract, ContractId, getId } from '../model/interface';

import { create, CREATE, CreateAction, isCreateAction } from './create';
import { update, UPDATE, UpdateAction, isUpdateAction } from './update';
import { remove, REMOVE, RemoveAction, isRemoveAction } from './remove';

describe(`${name}.actions`, () => {
    const address = '0x0000000000000000000000000000000000000001';
    const item: Contract = {
        networkId,
        address,
        abi: BlockNumberAbi.abi as any,
    };
    const id: ContractId = { networkId, address };

    it('create', () => {
        const expected: CreateAction = {
            type: CREATE,
            payload: { ...item, id: getId(item) },
        };
        assert.isTrue(isCreateAction(expected));
        assert.deepEqual(create(item), expected);
    });

    it('update', () => {
        const expected: UpdateAction = {
            type: UPDATE,
            payload: { ...item, id: getId(item) },
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

import { assert } from 'chai';
import BlockNumberAbi from '../../abis/BlockNumber.json';

import { name } from '../common';
import { Contract, getId, validate, getIdDeconstructed } from '../model/interface';

import { create, CREATE, CreateAction, isCreateAction } from './create';
import { update, UPDATE, UpdateAction, isUpdateAction } from './update';
import { remove, REMOVE, RemoveAction, isRemoveAction } from './remove';

describe(`${name}.actions`, () => {
    const networkId = '1337';
    const item: Contract = {
        networkId,
        address: '0x0000000000000000000000000000000000000001',
        abi: BlockNumberAbi.abi as any,
    };

    const id = getId(item);
    const itemWithId = validate(item);
    const idDeconstructed = getIdDeconstructed(id);

    it('create', () => {
        const expected: CreateAction = {
            type: CREATE,
            payload: itemWithId,
        };
        assert.isTrue(isCreateAction(expected));
        assert.deepEqual(create(item), expected);
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
        assert.deepEqual(remove(idDeconstructed), expected);
    });
});

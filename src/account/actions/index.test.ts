import { assert } from 'chai';

import { name } from '../common';
import { getId, Interface } from '../model/interface';
import { ZERO_ADDRESS } from '../../utils';

import { create, CREATE, CreateAction, isCreateAction } from './create';
import { update, UPDATE, UpdateAction, isUpdateAction } from './update';
import { remove, REMOVE, RemoveAction, isRemoveAction } from './remove';
import { set, SET, SetAction, isSetAction } from './set';

describe(`${name}.actions`, () => {
    const networkId = '1337';
    const item: Interface = { networkId, address: ZERO_ADDRESS };
    const id = getId(item);

    it('create', () => {
        const expected: CreateAction = {
            type: CREATE,
            payload: { id: id, ...item },
        };
        assert.isTrue(isCreateAction(expected));
        assert.deepEqual(create(item), expected);
    });

    it('update', () => {
        const expected: UpdateAction = {
            type: UPDATE,
            payload: { id: id, ...item },
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
        assert.deepEqual(remove(item), expected);
    });

    it('set', () => {
        const expected: SetAction = {
            type: SET('networkId'),
            payload: { id: id, key: 'networkId' as keyof Interface, value: item.networkId },
        };
        assert.isTrue(isSetAction(expected));
        assert.deepEqual(set({ id: id, key: 'networkId', value: item.networkId }), expected);
    });
});

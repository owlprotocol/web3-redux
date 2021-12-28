import { assert } from 'chai';

import { name } from '../common';
import { Account, getId } from '../model/interface';
import { ZERO_ADDRESS } from '../../utils';

import { create, CREATE, CreateAction, isCreateAction } from './create';
import { update, UPDATE, UpdateAction, isUpdateAction } from './update';
import { remove, REMOVE, RemoveAction, isRemoveAction } from './remove';
import { set, SET, SetAction, isSetAction } from './set';

describe(`${name}.actions`, () => {
    const networkId = '1337';
    const item: Account = { networkId, address: ZERO_ADDRESS };
    const itemWithId = { id: getId(item), ...item };

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
            payload: item,
        };
        assert.isTrue(isRemoveAction(expected));
        assert.deepEqual(remove(item), expected);
    });

    it('set', () => {
        const expected: SetAction = {
            type: SET('networkId'),
            payload: { id: getId(item), key: 'networkId' as keyof Account, value: item.networkId },
        };
        assert.isTrue(isSetAction(expected));
        assert.deepEqual(set({ id: getId(item), key: 'networkId', value: item.networkId }), expected);
    });
});

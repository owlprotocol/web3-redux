import { assert } from 'chai';

import { create, CREATE, CreateAction, isCreateAction } from './create';
import { update, UPDATE, UpdateAction, isUpdateAction } from './update';
import { remove, REMOVE, RemoveAction, isRemoveAction } from './remove';
import { set, SET, SetAction, isSetAction } from './set';
import Config from '../model/interface';
import { networkId, ADDRESS_0 } from '../../test/data';
import { name } from '../common';

describe(`${name}.actions`, () => {
    const item: Config = { id: '0', networkId, account: ADDRESS_0 };
    const id = item.id;

    it('create', () => {
        const expected: CreateAction = {
            type: CREATE,
            payload: { ...item },
        };
        assert.isTrue(isCreateAction(expected));
        assert.deepEqual(create(item), expected);
    });

    it('update', () => {
        const expected: UpdateAction = {
            type: UPDATE,
            payload: { ...item },
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

    it('set', () => {
        const expected: SetAction = {
            type: SET('networkId'),
            payload: { id, key: 'networkId' as keyof Config, value: item.networkId },
        };
        assert.isTrue(isSetAction(expected));
        assert.deepEqual(set({ id: id, key: 'networkId', value: item.networkId }), expected);
    });
});

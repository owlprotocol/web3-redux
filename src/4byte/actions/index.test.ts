import { assert } from 'chai';

import { create, CREATE, CreateAction, isCreateAction } from './create';
import { update, UPDATE, UpdateAction, isUpdateAction } from './update';
import { remove, REMOVE, RemoveAction, isRemoveAction } from './remove';
import { set, SET, SetAction, isSetAction } from './set';
import { ADDRESS_0 } from '../../test/data';
import { _4ByteSignature } from '../model/interface';
import { name } from '../common';

describe(`${name}.action`, () => {
    const item: _4ByteSignature = { signatureHash: ADDRESS_0 };

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
            payload: item,
        };
        assert.isTrue(isRemoveAction(expected));
        assert.deepEqual(remove(item), expected);
    });

    it('set', () => {
        const expected: SetAction = {
            type: SET('signatureHash'),
            payload: {
                id: { signatureHash: item.signatureHash },
                key: 'signatureHash' as keyof _4ByteSignature,
                value: item.signatureHash,
            },
        };
        assert.isTrue(isSetAction(expected));
        assert.deepEqual(
            set({
                id: { signatureHash: item.signatureHash },
                key: 'signatureHash',
                value: item.signatureHash,
            }),
            expected,
        );
    });
});

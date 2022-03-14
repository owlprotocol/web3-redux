import { assert } from 'chai';

import { create, CREATE, CreateAction, isCreateAction } from './create.js';
import { update, UPDATE, UpdateAction, isUpdateAction } from './update.js';
import { remove, REMOVE, RemoveAction, isRemoveAction } from './remove.js';
import { set, SET, SetAction, isSetAction } from './set.js';
import { ADDRESS_0 } from '../../test/data.js';
import { _4ByteSignature } from '../model/interface.js';
import { name } from '../common.js';

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

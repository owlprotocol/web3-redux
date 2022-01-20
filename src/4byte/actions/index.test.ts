import { assert } from 'chai';

import { name } from '../common';
import { _4ByteSignature, getId } from '../model/interface';
import { ZERO_ADDRESS } from '../../utils';

import { create, CREATE, CreateAction, isCreateAction } from './create';
import { update, UPDATE, UpdateAction, isUpdateAction } from './update';
import { remove, REMOVE, RemoveAction, isRemoveAction } from './remove';
import { set, SET, SetAction, isSetAction } from './set';

describe(`${name}.action`, () => {
    const networkId = '1337';
    const item: _4ByteSignature = { networkId, signatureHash: ZERO_ADDRESS };

    it('create', () => {
        const expected: CreateAction = {
            type: CREATE,
            payload: { id: getId(item), ...item },
        };
        assert.isTrue(isCreateAction(expected));
        assert.deepEqual(create(item), expected);
    });

    it('update', () => {
        const expected: UpdateAction = {
            type: UPDATE,
            payload: { id: getId(item), ...item },
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
            payload: {
                id: { networkId: item.networkId, signatureHash: item.signatureHash },
                key: 'networkId' as keyof _4ByteSignature,
                value: item.networkId,
            },
        };
        assert.isTrue(isSetAction(expected));
        assert.deepEqual(
            set({
                id: { networkId: item.networkId, signatureHash: item.signatureHash },
                key: 'networkId',
                value: item.networkId,
            }),
            expected,
        );
    });
});

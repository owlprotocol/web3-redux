import { assert } from 'chai';
import { IPFS_HELLO_WORLD } from '../../test/data';

import { name } from '../common';

import { Ipfs } from '../model/interface';

import { create, CREATE, CreateAction, isCreateAction } from './create';
import { update, UPDATE, UpdateAction, isUpdateAction } from './update';
import { remove, REMOVE, RemoveAction, isRemoveAction } from './remove';

describe(`${name}.actions`, () => {
    const contentId = IPFS_HELLO_WORLD;
    const item: Ipfs = {
        contentId,
    };

    it('create', () => {
        const expected: CreateAction = {
            type: CREATE,
            payload: { contentId },
        };
        assert.isTrue(isCreateAction(expected));
        assert.deepEqual(create(item), expected);
    });

    it('update', () => {
        const expected: UpdateAction = {
            type: UPDATE,
            payload: { contentId },
        };
        assert.isTrue(isUpdateAction(expected));
        assert.deepEqual(update(item), expected);
    });

    it('remove', () => {
        const expected: RemoveAction = {
            type: REMOVE,
            payload: { contentId },
        };
        assert.isTrue(isRemoveAction(expected));
        assert.deepEqual(remove({ contentId }), expected);
    });
});

import { assert } from 'chai';
import { create, CREATE, CreateAction, isCreateAction } from './create.js';
import { update, UPDATE, UpdateAction, isUpdateAction } from './update.js';
import { remove, REMOVE, RemoveAction, isRemoveAction } from './remove.js';
import { IPFS_HELLO_WORLD } from '../../test/data.js';

import { name } from '../common.js';

import { Ipfs } from '../model/interface.js';

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

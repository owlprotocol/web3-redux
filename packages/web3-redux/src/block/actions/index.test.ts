import { assert } from 'chai';

import { create, CREATE, CreateAction, isCreateAction } from './create.js';
import { update, UPDATE, UpdateAction, isUpdateAction } from './update.js';
import { remove, REMOVE, RemoveAction, isRemoveAction } from './remove.js';
import { set, SET, SetAction, isSetAction } from './set.js';
import { FETCH, fetch, FetchAction, isFetchAction } from './fetch.js';
import { SUBSCRIBE, subscribe, SubscribeAction, isSubscribeAction } from './subscribe.js';
import { UNSUBSCRIBE, unsubscribe, UnsubscribeAction, isUnsubscribeAction } from './unsubscribe.js';
import { BlockHeader } from '../model/BlockHeader.js';
import { getId } from '../model/id.js';
import { networkId } from '../../test/data.js';
import { name } from '../common.js';

describe(`${name}.actions`, () => {
    const item: BlockHeader = { networkId, number: 0 };

    it('create', () => {
        const expected: CreateAction = {
            type: CREATE,
            payload: { id: getId(item), ...item },
            meta: { uuid: '' },
        };
        assert.isTrue(isCreateAction(expected));
        assert.deepEqual(create(item, ''), expected);
    });

    it('update', () => {
        const expected: UpdateAction = {
            type: UPDATE,
            payload: { id: getId(item), ...item },
            meta: { uuid: '' },
        };
        assert.isTrue(isUpdateAction(expected));
        assert.deepEqual(update(item, ''), expected);
    });

    it('remove', () => {
        const expected: RemoveAction = {
            type: REMOVE,
            payload: { ...item },
        };
        assert.isTrue(isRemoveAction(expected));
        assert.deepEqual(remove(item), expected);
    });

    it('set', () => {
        const expected: SetAction = {
            type: SET('networkId'),
            payload: { id: { ...item }, key: 'networkId' as keyof BlockHeader, value: item.networkId },
        };
        assert.isTrue(isSetAction(expected));
        assert.deepEqual(set({ id: item, key: 'networkId', value: item.networkId }), expected);
    });

    it('fetch', () => {
        const expected: FetchAction = {
            type: FETCH,
            payload: { networkId, blockHashOrBlockNumber: 0 },
            meta: { uuid: '' },
        };
        assert.isTrue(isFetchAction(expected));
        assert.deepEqual(fetch({ networkId, blockHashOrBlockNumber: 0 }, ''), expected);
    });

    it('subscribe', () => {
        const expected: SubscribeAction = {
            type: SUBSCRIBE,
            payload: { networkId },
        };
        assert.isTrue(isSubscribeAction(expected));
        assert.deepEqual(subscribe({ networkId }), expected);
    });

    it('unsubscribe', () => {
        const expected: UnsubscribeAction = {
            type: UNSUBSCRIBE,
            payload: networkId,
        };
        assert.isTrue(isUnsubscribeAction(expected));
        assert.deepEqual(unsubscribe(networkId), expected);
    });
});

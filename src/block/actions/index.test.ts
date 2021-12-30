import { assert } from 'chai';

import { name } from '../common';
import { getId } from '../model/id';
import BlockHeader from '../model/BlockHeader';

import { create, CREATE, CreateAction, isCreateAction } from './create';
import { update, UPDATE, UpdateAction, isUpdateAction } from './update';
import { remove, REMOVE, RemoveAction, isRemoveAction } from './remove';
import { set, SET, SetAction, isSetAction } from './set';
import { FETCH, fetch, FetchAction, isFetchAction } from './fetch';
import { SUBSCRIBE, subscribe, SubscribeAction, isSubscribeAction } from './subscribe';
import { UNSUBSCRIBE, unsubscribe, UnsubscribeAction, isUnsubscribeAction } from './unsubscribe';

describe(`${name}.actions`, () => {
    const networkId = '1337';
    const item: BlockHeader = { networkId, number: 0 };
    const id = { ...item };

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
        assert.deepEqual(remove(item), expected);
    });

    it('set', () => {
        const expected: SetAction = {
            type: SET('networkId'),
            payload: { id: getId(id), key: 'networkId' as keyof BlockHeader, value: item.networkId },
        };
        assert.isTrue(isSetAction(expected));
        assert.deepEqual(set({ id: id, key: 'networkId', value: item.networkId }), expected);
    });

    it('fetch', () => {
        const expected: FetchAction = {
            type: FETCH,
            payload: { networkId, blockHashOrBlockNumber: 0 },
        };
        assert.isTrue(isFetchAction(expected));
        assert.deepEqual(fetch({ networkId, blockHashOrBlockNumber: 0 }), expected);
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

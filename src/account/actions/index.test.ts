import { assert } from 'chai';
import { CREATE, UPDATE, REMOVE, SET, create, update, remove, set } from './index';

import { name } from '../common';
import Interface, { InterfacePartial } from '../model/interface';
import { ZERO_ADDRESS } from '../../utils';

describe(`${name}.actions`, () => {
    const networkId = '1337';
    const account: InterfacePartial = { networkId, address: ZERO_ADDRESS };
    const accountId = `${networkId}-${ZERO_ADDRESS}`;

    it('create', () => {
        const expected = {
            type: CREATE,
            payload: { id: accountId, ...account },
        };
        assert.deepEqual(create(account), expected);
    });

    it('update', () => {
        const expected = {
            type: UPDATE,
            payload: { id: accountId, ...account },
        };
        assert.deepEqual(update(account), expected);
    });

    it('remove', () => {
        const expected = {
            type: REMOVE,
            payload: accountId,
        };
        assert.deepEqual(remove(accountId), expected);
        assert.deepEqual(remove(account), expected);
    });

    it('set', () => {
        const expected = {
            type: SET('networkId'),
            payload: { id: accountId, key: 'networkId' as keyof Interface, value: account.networkId },
        };
        assert.deepEqual(set({ id: accountId, key: 'networkId', value: account.networkId }), expected);
    });
});

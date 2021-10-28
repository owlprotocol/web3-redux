import { attr, Model as ORMModel } from 'redux-orm';
import { toChecksumAddress } from 'web3-utils';

/**
 * Ethereum Account. Store balance, nonce.
 *
 * @param id - Used to index in redux-orm. Computed as `${networkId}-${address}`.
 * @param address - Account address.
 * @param balance - Account balance.
 * @param nonce - Account nonce.
 */
export interface Account {
    id?: string;
    networkId: string;
    address: string;
    balance?: string;
    nonce?: number;
}

class Model extends ORMModel {
    static options = {
        idAttribute: 'id',
    };

    static modelName = 'Account';

    static fields = {
        id: attr(),
        address: attr(),
        balance: attr(),
        nonce: attr(),
    };
}

export function accountId({ networkId, address }: { networkId: string; address: string }) {
    return `${networkId}-${address}`;
}

export function validatedAccount(account: Account): Account {
    const { networkId, address } = account;
    const addressCheckSum = toChecksumAddress(address);
    const id = accountId({ networkId, address: addressCheckSum });

    return {
        ...account,
        id,
        address: addressCheckSum,
    };
}

export { Model };

import { createSelector } from 'redux-orm';
import { Account } from './model';
import { orm } from '../orm';
import { accountId } from '.';
import { isAddress } from 'web3-utils';

const select = createSelector(orm.Account);
export function selectByIdSingle(state: any, id?: string): Account | undefined {
    if (!id) return undefined;
    //@ts-ignore
    return select(state, id) as Contract<T> | undefined;
}
export function selectByIdMany(state: any, ids?: string[]): (Account | null)[] {
    return select(state, ids);
}
export function selectById(state: any, id?: string | string[]) {
    if (Array.isArray(id)) {
        return selectByIdMany(state, id);
    } else {
        return selectByIdSingle(state, id);
    }
}

export function selectByAddressSingle(state: any, networkId?: string, address?: string): Account | undefined {
    if (!networkId || !address) return undefined;
    if (!isAddress(address)) return undefined;

    const id = accountId({ address, networkId });
    return selectByIdSingle(state, id);
}

const EMPTY_ACCOUNTS: any[] = [];
export function selectByAddressMany(state: any, networkId?: string, address?: string[]): (Account | null)[] {
    if (!networkId || !address) return EMPTY_ACCOUNTS;

    //empty string will return null in selectMany()
    const id: string[] = address.map((address) => (isAddress(address) ? accountId({ address, networkId }) : ''));
    return selectByIdMany(state, id);
}

export function selectByAddress(state: any, networkId?: string, address?: string | string[]) {
    if (Array.isArray(address)) {
        return selectByAddressMany(state, networkId, address);
    } else {
        return selectByAddressSingle(state, networkId, address);
    }
}

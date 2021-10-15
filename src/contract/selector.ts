import { createSelector } from 'redux-orm';
import { BaseWeb3Contract, CallArgsHash, callArgsHash, Contract, contractId } from './model';
import { orm } from '../orm';
import { EthCall } from '../ethcall/model';
import { filter } from 'lodash';
import { ContractEvent, ReturnValues } from '../contractevent/model';
import Web3 from 'web3';
import { memoizeWeak, memoizeReturn } from '../memo';
import { Await } from '../types/promise';

//Weak memo for first arg, JSON serialize memo for second arg
const weakFilter = memoizeWeak(filter);
const memoizedLodashFilter = (x: any, f: any) => {
    return weakFilter(x, memoizeReturn(f));
};

const select = createSelector(orm.Contract);
export function selectByIdSingle<T extends BaseWeb3Contract = BaseWeb3Contract>(
    state: any,
    id?: string,
): Contract<T> | undefined {
    if (!id) return undefined;
    //@ts-ignore
    return select(state, id) as Contract<T> | undefined;
}
export function selectByIdMany<T extends BaseWeb3Contract = BaseWeb3Contract>(
    state: any,
    ids?: string[],
): (Contract<T> | null)[] {
    return select(state, ids);
}
export function selectById<T extends BaseWeb3Contract = BaseWeb3Contract>(state: any, id?: string | string[]) {
    if (Array.isArray(id)) {
        return selectByIdMany<T>(state, id);
    } else {
        return selectByIdSingle<T>(state, id);
    }
}

export function selectByAddressSingle<T extends BaseWeb3Contract = BaseWeb3Contract>(
    state: any,
    address?: string,
    networkId?: string,
): Contract<T> | undefined {
    if (!networkId || !address) return undefined;
    if (!Web3.utils.isAddress(address)) return undefined;

    const id = contractId({ address, networkId });
    return selectByIdSingle(state, id);
}

const EMPTY_CONTRACTS: any[] = [];
export function selectByAddressMany<T extends BaseWeb3Contract = BaseWeb3Contract>(
    state: any,
    address?: string[],
    networkId?: string,
): (Contract<T> | null)[] {
    if (!networkId || !address) return EMPTY_CONTRACTS;

    //empty string will return null in selectMany()
    const id: string[] = address.map((address) =>
        Web3.utils.isAddress(address) ? contractId({ address, networkId }) : '',
    );
    return selectByIdMany(state, id);
}

export function selectByAddress<T extends BaseWeb3Contract = BaseWeb3Contract>(
    state: any,
    address?: string | string[],
    networkId?: string,
) {
    if (Array.isArray(address)) {
        return selectByAddressMany<T>(state, address, networkId);
    } else {
        return selectByAddressSingle<T>(state, address, networkId);
    }
}

//Contract Call
const contractCallSelect = createSelector(
    orm,
    (_1: string, id: string) => id,
    (_1: string, _2: string, methodName: string) => methodName,
    (_1: string, _2: string, _3: string, callArgs?: CallArgsHash) => callArgs,
    (session: any, id: string, methodName: string, callArgs?: CallArgsHash) => {
        if (!id || !methodName) return undefined;

        const contract: Contract | undefined = session.Contract.withId(id);
        if (!contract) return undefined;
        if (!contract.methods) return undefined;

        const method = contract.methods[methodName];
        if (!method) return undefined;

        const hash = callArgsHash(callArgs);
        if (!method[hash]) return undefined;
        const { ethCallId } = method[hash];
        if (!ethCallId) return undefined;

        const ethCall: EthCall = session.EthCall.withId(ethCallId);
        if (!ethCall) return undefined;

        return ethCall.returnValue;
    },
);
export function selectContractCallById<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['methods'] = string,
>(
    state: any,
    id?: string,
    methodName?: K,
    callArgs?: CallArgsHash<Parameters<T['methods'][K]>>,
): Await<ReturnType<ReturnType<T['methods'][K]>['call']>> | undefined {
    return contractCallSelect(state, id, methodName, callArgs);
}

type selectContractCallByAddress = (
    state: any,
    address?: string,
    methodName?: string,
    callArgs?: CallArgsHash,
    networkId?: string,
) => any;
export function selectContractCallByAddress<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['methods'] = string,
>(
    state: any,
    address?: string,
    methodName?: K,
    callArgs?: CallArgsHash<Parameters<T['methods'][K]>>,
    networkId?: string,
): Await<ReturnType<ReturnType<T['methods'][K]>['call']>> | undefined {
    if (!networkId || !address || !methodName) return undefined;
    if (!Web3.utils.isAddress(address)) return undefined;

    const id = contractId({ address, networkId });
    return selectContractCallById<T, K>(state, id, methodName, callArgs);
}
export const selectContractCall = selectContractCallByAddress;

export function selectContractCallFactory<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['methods'] = string,
>(methodName: K) {
    type U = Await<ReturnType<ReturnType<T['methods'][K]>['call']>>;
    return (
        state: any,
        networkId?: string,
        address?: string,
        args?: Parameters<T['methods'][K]>,
        options?: CallArgsHash<Parameters<T['methods'][K]>>,
    ): U | undefined => {
        return selectContractCallByAddress<T, K>(state, address, methodName, { args, ...options }, networkId);
    };
}

//Events
type selectContractEventsById = (state: any, id?: string) => ContractEvent[] | null;
export const selectContractEventsById: selectContractEventsById = createSelector(orm.Contract.events);

const contractEventSelect = createSelector(
    orm,
    selectContractEventsById,
    (_1: any, _2: string, eventName: string) => eventName,
    (_1: any, _2: string, _3: string, returnValuesFilter?: { [key: string]: any }) => returnValuesFilter,
    (
        session: any,
        events: ReturnType<selectContractEventsById>,
        eventName: string,
        returnValuesFilter?: { [key: string]: any },
    ) => {
        if (!events) return undefined;

        //TODO: Index by name to memoize changes by events as well
        //Memoize filter by name
        const filteredByName = memoizedLodashFilter(events, { name: eventName });
        if (!returnValuesFilter) return filteredByName;

        return memoizedLodashFilter(filteredByName, { returnValues: returnValuesFilter });
    },
);

//TODO: type inference returnValuesFilter
export function selectContractEventsByIdFiltered<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['events'] = string,
    U extends ReturnValues = ReturnValues,
>(state: any, id?: string, eventName?: K, returnValuesFilter?: { [key: string]: any }): ContractEvent<U>[] | undefined {
    return contractEventSelect(state, id, eventName, returnValuesFilter);
}

export function selectContractEventsByAddressFiltered<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['events'] = string,
    U extends ReturnValues = ReturnValues,
>(
    state: any,
    address?: string,
    eventName?: K,
    returnValuesFilter?: { [key: string]: any },
    networkId?: string,
): ContractEvent<U>[] | undefined {
    if (!networkId || !address || !eventName) return undefined;
    if (!Web3.utils.isAddress(address)) return undefined;

    const id = contractId({ address, networkId });
    return selectContractEventsByIdFiltered(state, id, eventName, returnValuesFilter);
}

export const selectEvents = selectContractEventsByAddressFiltered;

export function selectEventsFactory<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['events'] = string,
    U extends ReturnValues = ReturnValues,
>(eventName: K) {
    return (state: any, networkId?: string, address?: string, filter?: any): U[] | undefined => {
        return selectContractEventsByAddressFiltered<T, K, U>(state, address, eventName, filter, networkId) as
            | U[]
            | undefined;
    };
}

import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReturnValues } from '../../contractevent/model';
import { BaseWeb3Contract } from '../model';
import { eventSubscribe, eventUnsubscribe, eventGetPast } from '../actions';
import {
    selectByAddressSingle as selectContractByAddressSingle,
    selectContractEventsByAddressFiltered,
} from '../selector';

//Contract Events
export interface UseEventsOptions {
    fromBlock?: number | string;
    toBlock?: number | string;
    past?: boolean;
    blockBatch?: number;
}
export function useEvents<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['events'] = string,
    U extends ReturnValues = ReturnValues,
>(networkId?: string, address?: string, eventName?: K, filter?: { [key: string]: any }, options?: UseEventsOptions) {
    const { fromBlock, toBlock, blockBatch, past } = options ?? {};

    const contract = useSelector((state) => selectContractByAddressSingle(state, networkId, address));
    const contractExists = !!contract;

    const dispatch = useDispatch();

    const events = useSelector((state) =>
        selectContractEventsByAddressFiltered<T, K, U>(state, networkId, address, eventName, filter),
    );
    const filterHash = filter ? JSON.stringify(filter) : '';

    //Recompute functions if network/contract is created, otherwise function is void
    const getPast = useCallback(() => {
        if (networkId && address && contractExists && past) {
            dispatch(
                eventGetPast({
                    networkId,
                    address,
                    eventName: eventName as string,
                    filter,
                    fromBlock,
                    toBlock,
                    blockBatch,
                }),
            );
        }
    }, [networkId, address, eventName, filterHash, fromBlock, toBlock, dispatch, contractExists, past]);

    const subscribe = useCallback(() => {
        if (networkId && address && contractExists) {
            dispatch(
                eventSubscribe({
                    networkId,
                    address,
                    eventName: eventName as string,
                    filter,
                    fromBlock,
                }),
            );
        }
    }, [networkId, address, eventName, filterHash, fromBlock, dispatch, contractExists]);

    const unsubscribe = useCallback(() => {
        if (networkId && address && contractExists) {
            dispatch(
                eventUnsubscribe({
                    networkId,
                    address,
                    eventName: eventName as string,
                    filter,
                }),
            );
        }
    }, [networkId, address, eventName, filterHash, dispatch, contractExists]);

    useEffect(() => {
        getPast();
        subscribe();

        return () => {
            unsubscribe();
        };
    }, [getPast, subscribe, unsubscribe]);

    return [events, { subscribe, unsubscribe }];
}

export function contractEventsHookFactory<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['events'] = string,
    U extends ReturnValues = ReturnValues,
>(eventName: K) {
    return (networkId?: string, address?: string, filter?: { [key: string]: any }, options?: UseEventsOptions) => {
        return useEvents<T, K, U>(networkId, address, eventName, filter, options);
    };
}

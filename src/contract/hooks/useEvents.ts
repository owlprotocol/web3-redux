import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReturnValues } from '../../contractevent/model';
import { useNetworkId } from '../../config/hooks';
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
}
export function useEvents<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['events'] = string,
    U extends ReturnValues = ReturnValues,
>(networkId?: string, address?: string, eventName?: K, filter?: { [key: string]: any }, options?: UseEventsOptions) {
    const { fromBlock, toBlock, past } = options ?? {};
    const defaultNetworkId = useNetworkId();
    networkId = networkId ?? defaultNetworkId;

    const contract = useSelector((state) => selectContractByAddressSingle(state, address, networkId));

    const dispatch = useDispatch();

    const events = useSelector((state) =>
        selectContractEventsByAddressFiltered<T, K, U>(state, address, eventName, filter, networkId),
    );
    const filterHash = filter ? JSON.stringify(filter) : '';

    //Recompute functions if network/contract is created, otherwise function is void
    const getPast = useCallback(() => {
        if (networkId && address && contract && past) {
            dispatch(
                eventGetPast({
                    networkId,
                    address,
                    eventName: eventName as string,
                    filter,
                    fromBlock,
                    toBlock,
                }),
            );
        }
    }, [networkId, address, eventName, filterHash, fromBlock, toBlock, dispatch, contract, past]);

    const subscribe = useCallback(() => {
        if (networkId && address && contract) {
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
    }, [networkId, address, eventName, filterHash, fromBlock, dispatch, contract]);

    const unsubscribe = useCallback(() => {
        if (networkId && address && contract) {
            dispatch(
                eventUnsubscribe({
                    networkId,
                    address,
                    eventName: eventName as string,
                    filter,
                }),
            );
        }
    }, [networkId, address, eventName, filterHash, dispatch, contract]);

    useEffect(() => {
        getPast();
        subscribe();

        return () => {
            unsubscribe();
        };
    }, [networkId, address, eventName, filterHash, dispatch, contract]);

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

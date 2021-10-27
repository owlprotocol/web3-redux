import { useEffect, useCallback, useMemo, useDebugValue } from 'react';
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
    past?: boolean; //Send event get past action
    sync?: boolean; //Send event subscribe action
    blockBatch?: number;
}
export function useEvents<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['events'] = string,
    U extends ReturnValues = ReturnValues,
>(networkId?: string, address?: string, eventName?: K, filter?: { [key: string]: any }, options?: UseEventsOptions) {
    const { fromBlock, toBlock, blockBatch, past, sync } = options ?? {};

    const contract = useSelector((state) => selectContractByAddressSingle(state, networkId, address));
    const contractExists = !!contract;

    const dispatch = useDispatch();

    const events = useSelector((state) =>
        selectContractEventsByAddressFiltered<T, K, U>(state, networkId, address, eventName, filter),
    );
    const filterHash = filter ? JSON.stringify(filter) : '';

    const getPastAction = useMemo(() => {
        if (networkId && address && contractExists && past) {
            return eventGetPast({
                networkId,
                address,
                eventName: eventName as string,
                filter,
                fromBlock,
                toBlock,
                blockBatch,
            });
        }
        return undefined;
    }, [networkId, address, eventName, filterHash, fromBlock, toBlock, blockBatch, contractExists, past]);

    const subscribeAction = useMemo(() => {
        if (networkId && address && contractExists && sync) {
            return eventSubscribe({
                networkId,
                address,
                eventName: eventName as string,
                filter,
                fromBlock,
            });
        }
        return undefined;
    }, [networkId, address, eventGetPast, filterHash, fromBlock, contractExists, sync]);

    const unsubscribeAction = useMemo(() => {
        if (networkId && address && contractExists && sync) {
            return eventUnsubscribe({
                networkId,
                address,
                eventName: eventName as string,
                filter,
            });
        }
        return undefined;
    }, [networkId, address, eventName, filterHash, contractExists, sync]);

    useDebugValue({ events, getPastAction, subscribeAction, unsubscribeAction });

    //Send getPast action
    const getPast = useCallback(() => {
        if (getPastAction) dispatch(getPastAction);
    }, [getPastAction]);

    useEffect(() => {
        getPast();
    }, [getPast]);

    const subscribe = useCallback(() => {
        if (subscribeAction) dispatch(subscribeAction);
    }, [dispatch, subscribeAction]);

    const unsubscribe = useCallback(() => {
        if (unsubscribeAction) dispatch(unsubscribeAction);
    }, [dispatch, unsubscribeAction]);

    useEffect(() => {
        subscribe();
        return () => {
            unsubscribe();
        };
    }, [subscribe, unsubscribe]);

    return [events, { getPast, subscribe, unsubscribe }];
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

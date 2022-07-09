import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { BaseWeb3Contract } from '../model/index.js';
import { eventSubscribe, eventUnsubscribe, eventGetPast } from '../actions/index.js';
import { EventGetPastActionInput } from '../actions/eventGetPast.js';
import { isAddress } from '../../utils/web3-utils/index.js';
import ContractCRUD from '../crud.js';
import ContractEventCRUD from '../../contractevent/crud.js';
import { ContractEvent } from '../../contractevent/model/index.js';

//Contract Events
/** @internal */
export interface UseEventsOptions {
    fromBlock?: EventGetPastActionInput['fromBlock'];
    toBlock?: EventGetPastActionInput['toBlock'];
    past?: boolean; //Send event get past action
    sync?: boolean; //Send event subscribe action
    blockBatch?: number;
    max?: number; //Max events to fetch
}
/**
 * Fetch and sync contract events. Return list of events with optional filter.
 * @category Hooks
 */
export function useEvents<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['events'] = string,
    U extends Record<string, any> = Record<string, any>,
    >(
        networkId: string | undefined,
        address: string | undefined,
        eventName: K | undefined,
        filter?: { [key: string]: any },
        options?: UseEventsOptions,
) {
    const { fromBlock, toBlock, blockBatch, max, past, sync } = options ?? {};

    const addressChecksum = address && isAddress(address) ? address.toLowerCase() : undefined;
    const contract = ContractCRUD.hooks.useSelectByIdSingle({ networkId, address });
    const contractExists = !!contract;

    const dispatch = useDispatch();

    //TODO: handle filter
    const events = ContractEventCRUD.hooks.useWhere({
        networkId,
        address: addressChecksum,
        name: eventName as string | undefined,
    }) as ContractEvent<U>[] | undefined;
    const filterHash = filter ? JSON.stringify(filter) : '';

    const getPastAction = useMemo(() => {
        if (networkId && addressChecksum && eventName && contractExists && past) {
            return eventGetPast({
                networkId,
                address: addressChecksum,
                eventName: eventName as string,
                filter,
                fromBlock,
                toBlock,
                blockBatch,
                max,
            });
        }
    }, [networkId, addressChecksum, eventName, filterHash, fromBlock, toBlock, blockBatch, contractExists, past]);

    const subscribeAction = useMemo(() => {
        if (networkId && addressChecksum && eventName && contractExists && sync) {
            return eventSubscribe({
                networkId,
                address: addressChecksum,
                eventName: eventName as string,
                filter,
            });
        }
    }, [networkId, addressChecksum, eventName, filterHash, contractExists, sync]);

    const unsubscribeAction = useMemo(() => {
        if (networkId && addressChecksum && contractExists && sync) {
            return eventUnsubscribe({
                networkId,
                address: addressChecksum,
                eventName: eventName as string,
                filter,
            });
        }
    }, [networkId, addressChecksum, eventName, filterHash, contractExists, sync]);

    //Send getPast action
    useEffect(() => {
        if (getPastAction) dispatch(getPastAction);
    }, [dispatch, getPastAction]);

    useEffect(() => {
        if (subscribeAction) dispatch(subscribeAction);
        return () => {
            if (unsubscribeAction) dispatch(unsubscribeAction);
        };
    }, [subscribeAction, unsubscribeAction]);

    return events;
}

/** @category Hooks */
export function contractEventsHookFactory<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['events'] = string,
    U extends Record<string, any> = Record<string, any>,
    >(eventName: K) {
    return (
        networkId: string | undefined,
        address: string | undefined,
        filter?: { [key: string]: any },
        options?: UseEventsOptions,
    ) => {
        return useEvents<T, K, U>(networkId, address, eventName, filter, options);
    };
}

export default useEvents;

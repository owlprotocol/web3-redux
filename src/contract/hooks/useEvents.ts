import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReturnValues } from '../../contractevent/model/interface';
import { BaseWeb3Contract } from '../model';
import { eventSubscribe, eventUnsubscribe, eventGetPast } from '../actions';
import { EventGetPastActionInput } from '../actions/eventGetPast';
import selectSingle from '../selectors/selectByIdSingle';
import selectEvents from '../selectors/selectContractEventsById';

//Contract Events
/** @internal */
export interface UseEventsOptions {
    fromBlock?: EventGetPastActionInput['fromBlock'];
    toBlock?: EventGetPastActionInput['toBlock'];
    past?: boolean; //Send event get past action
    sync?: boolean; //Send event subscribe action
    blockBatch?: number;
}
/**
 * @category Hooks
 * Fetch and sync contract events. Return list of events with optional filter.
 */
export function useEvents<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['events'] = string,
    U extends ReturnValues = ReturnValues,
>(
    networkId: string | undefined,
    address: string | undefined,
    eventName: K | undefined,
    filter?: { [key: string]: any },
    options?: UseEventsOptions,
) {
    const { fromBlock, toBlock, blockBatch, past, sync } = options ?? {};

    const id = networkId && address ? { networkId, address } : undefined;
    const contract = useSelector((state) => selectSingle(state, id));
    const contractExists = !!contract;

    const dispatch = useDispatch();

    const events = useSelector((state) => selectEvents<T, K, U>(state, id, eventName, filter));
    const filterHash = filter ? JSON.stringify(filter) : '';

    const getPastAction = useMemo(() => {
        if (networkId && address && eventName && contractExists && past) {
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
        if (networkId && address && eventName && contractExists && sync) {
            return eventSubscribe({
                networkId,
                address,
                eventName: eventName as string,
                filter,
            });
        }
        return undefined;
    }, [networkId, address, eventName, filterHash, contractExists, sync]);

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
    U extends ReturnValues = ReturnValues,
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

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReturnValues } from '../../contractevent/model/interface.js';
import { BaseWeb3Contract } from '../model/index.js';
import { eventSubscribe, eventUnsubscribe, eventGetPast } from '../actions/index.js';
import { EventGetPastActionInput } from '../actions/eventGetPast.js';
import selectSingle from '../selectors/selectByIdSingle.js';
import selectEvents from '../selectors/selectContractEventsById.js';
import { isAddress, toChecksumAddress } from '../../utils/web3-utils/index.js';

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
 * Fetch and sync contract events. Return list of events with optional filter.
 * @category Hooks
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

    const addressChecksum = address && isAddress(address) ? toChecksumAddress(address) : undefined;
    const id = networkId && addressChecksum ? { networkId, address: addressChecksum } : undefined;
    const contract = useSelector((state) => selectSingle(state, id));
    const contractExists = !!contract;

    const dispatch = useDispatch();

    const events = useSelector((state) => selectEvents<T, K, U>(state, id, eventName, filter));
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

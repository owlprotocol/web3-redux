import { useEffect, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { BaseWeb3Contract } from '../model/index.js';
import { eventSubscribe, eventUnsubscribe, eventGetPast } from '../actions/index.js';
import { EventGetPastActionInput } from '../actions/eventGetPast.js';
import ContractCRUD from '../crud.js';
import ContractEventCRUD from '../../contractevent/crud.js';
import { ContractEvent } from '../../contractevent/model/index.js';
import ErrorCRUD from '../../error/crud.js';

//Contract Events
/** @internal */
export interface UseEventsOptions {
    fromBlock?: EventGetPastActionInput['fromBlock'];
    toBlock?: EventGetPastActionInput['toBlock'];
    blocks?: EventGetPastActionInput['blocks'];
    past?: boolean; //Send event get past action
    sync?: boolean; //Send event subscribe action
    blockBatch?: number;
    //Hook params
    reverse?: boolean;
    offset?: number;
    limit?: number;
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
        filter?: Partial<U>,
        options?: UseEventsOptions,
) {
    const { fromBlock, toBlock, past, sync } = options ?? {};
    const blockBatch = options?.blockBatch ?? 10000000;
    const blocks = options?.blocks ?? 10000000;
    const reverse = options?.reverse ?? true;
    const offset = options?.offset ?? 0;
    const limit = options?.limit ?? 20;

    const dispatch = useDispatch();
    const contract = ContractCRUD.hooks.useSelectByIdSingle({ networkId, address });
    const web3Contract = contract?.web3Contract ?? contract?.web3SenderContract;
    const web3ContractExists = !!web3Contract;

    //TODO: handle filter
    const [events] = ContractEventCRUD.hooks.useWhere(
        {
            networkId,
            address,
            name: eventName as string | undefined,
        },
        { reverse, offset, limit },
    ) as [ContractEvent<U>[] | undefined, any];

    const filterHash = filter ? JSON.stringify(filter) : '';

    //Actions
    const getPastAction = useMemo(() => {
        if (networkId && address && eventName) {
            return eventGetPast({
                networkId,
                address,
                eventName: eventName as string,
                filter,
                fromBlock,
                toBlock,
                blocks,
            });
        }
    }, [networkId, address, eventName, filterHash, fromBlock, toBlock, blocks]);
    const subscribeAction = useMemo(() => {
        if (networkId && address && eventName) {
            return eventSubscribe({
                networkId,
                address,
                eventName: eventName as string,
                filter,
            });
        }
    }, [networkId, address, eventName, filterHash]);
    const unsubscribeAction = useMemo(() => {
        if (networkId && address && eventName) {
            return eventUnsubscribe({
                networkId,
                address,
                eventName: eventName as string,
                filter,
            });
        }
    }, [networkId, address, eventName, filterHash]);

    //Callbacks
    const dispatchGetPastAction = useCallback(() => {
        if (getPastAction) dispatch(getPastAction);
    }, [dispatch, getPastAction]);
    const dispatchSubscribeAction = useCallback(() => {
        if (subscribeAction) dispatch(subscribeAction);
    }, [dispatch, subscribeAction]);
    const dispatchUnsubscribeAction = useCallback(() => {
        if (unsubscribeAction) dispatch(unsubscribeAction);
    }, [dispatch, unsubscribeAction]);

    //Effects
    useEffect(() => {
        if (past && web3ContractExists) dispatchGetPastAction();
    }, [dispatchGetPastAction, past, web3ContractExists]);

    useEffect(() => {
        if (sync && web3ContractExists) dispatchSubscribeAction();
        return dispatchUnsubscribeAction;
    }, [dispatchSubscribeAction, dispatchUnsubscribeAction, sync, web3ContractExists]);

    //Error
    const [getPastError] = ErrorCRUD.hooks.useGet(getPastAction?.meta.uuid);
    const [subscribeError] = ErrorCRUD.hooks.useGet(subscribeAction?.meta.uuid);
    const [unsubscribeError] = ErrorCRUD.hooks.useGet(unsubscribeAction?.meta.uuid);

    const error = useMemo(() => {
        if (!networkId) return new Error('networkId undefined');
        else if (!address) return new Error('address undefined');
        else if (!eventName) return new Error('eventName undefined');
        else if (!!getPastError) return ErrorCRUD.hydrate(getPastError).error;
        else if (!!subscribeError) return ErrorCRUD.hydrate(subscribeError).error;
        else if (!!unsubscribeError) return ErrorCRUD.hydrate(unsubscribeError).error;
    }, [networkId, address]);

    //Return
    const returnOptions = { error };
    return [events, returnOptions] as [typeof events, typeof returnOptions];
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
        filter?: Partial<U>,
        options?: UseEventsOptions,
    ) => {
        return useEvents<T, K, U>(networkId, address, eventName, filter, options);
    };
}

export default useEvents;

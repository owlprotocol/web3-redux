import { useEffect, useCallback, useMemo, useDebugValue } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseWeb3Contract } from '../model';
import { callSynced, callUnsync } from '../actions';
import { selectContractCallByAddress, selectByAddressSingle as selectContractByAddressSingle } from '../selector';
import { Await } from '../../types/promise';
import { Sync } from '../../sync/model';

//Contract Call
export interface UseContractCallOptions {
    from?: string;
    gas?: string;
    sync?: Sync | Sync['type'] | true | 'once';
}

export interface HookHandlers {
    subscribe: () => void;
    unsubscribe: () => void;
}
export function useContractCall<T extends BaseWeb3Contract = BaseWeb3Contract, K extends keyof T['methods'] = string>(
    networkId: string | undefined,
    address: string | undefined,
    method: K | undefined,
    args?: Parameters<T['methods'][K]>,
    options?: UseContractCallOptions,
): [Await<ReturnType<ReturnType<T['methods'][K]>['call']>> | undefined, HookHandlers] {
    const { from, sync } = options ?? {};

    const contract = useSelector((state) => selectContractByAddressSingle<T>(state, networkId, address));
    const contractExists = !!contract;

    const dispatch = useDispatch();
    const contractCall = useSelector((state) =>
        selectContractCallByAddress<T, K>(state, networkId, address, method, { args, from }),
    );

    const callSyncedAction = useMemo(() => {
        if (networkId && address && method && contractExists && sync) {
            return callSynced({
                networkId,
                address,
                method: method as string,
                args,
                from,
                sync,
            });
        }

        return undefined;
    }, [networkId, address, method, contractExists, sync]);
    const syncId = callSyncedAction?.payload.sync != 'once' ? callSyncedAction?.payload.sync?.id : undefined;
    const callUnsyncAction = useMemo(() => {
        if (syncId) return callUnsync(syncId);
        return undefined;
    }, [syncId]);

    useDebugValue({ contractCall, contractExists, sync, callSyncedAction, callUnsyncAction });

    //Recompute subscribe function if network/contract is created, otherwise function is void
    const subscribe = useCallback(() => {
        if (callSyncedAction) dispatch(callSyncedAction);
    }, [dispatch, callSyncedAction]);

    const unsubscribe = useCallback(() => {
        if (callUnsyncAction) dispatch(callUnsyncAction);
    }, [dispatch, callUnsyncAction]);

    useEffect(() => {
        subscribe();

        return () => {
            unsubscribe();
        };
    }, [subscribe, unsubscribe]);

    return [contractCall, { subscribe, unsubscribe }];
}

export function contractCallHookFactory<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['methods'] = string,
>(method: K) {
    return (
        networkId: string | undefined,
        address: string | undefined,
        args?: Parameters<T['methods'][K]>,
        options?: UseContractCallOptions,
    ) => {
        return useContractCall<T, K>(networkId, address, method, args, options);
    };
}

import { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Await } from '../../types/promise';

import { BaseWeb3Contract } from '../model';
import { callSynced, callUnsync } from '../actions';
import selectSingle from '../selectors/selectByIdSingle';
import selectContractCall from '../selectors/selectContractCallById';
import { CallSyncedActionInput } from '../actions/callSynced';

//Contract Call
/** @internal */
export interface UseContractCallOptions {
    from?: string;
    gas?: string;
    sync?: 'ifnull' | CallSyncedActionInput['sync'] | false;
}

/** @internal */
export interface HookHandlers {
    subscribe: () => void;
    unsubscribe: () => void;
}
/**
 * @category Hooks
 * Create a contract call and return value.
 */
export function useContractCall<T extends BaseWeb3Contract = BaseWeb3Contract, K extends keyof T['methods'] = string>(
    networkId: string | undefined,
    address: string | undefined,
    method: K | undefined,
    args?: Parameters<T['methods'][K]>,
    options?: UseContractCallOptions,
): [Await<ReturnType<ReturnType<T['methods'][K]>['call']>> | undefined, HookHandlers] {
    const fetch = options?.sync ?? 'ifnull';
    const from = options?.from;

    const dispatch = useDispatch();
    const id = networkId && address ? { networkId, address } : undefined;

    const contract = useSelector((state) => selectSingle<T>(state, id));
    const web3ContractExists = !!contract?.web3Contract || !!contract?.web3SenderContract;

    const contractCall = useSelector((state) => selectContractCall<T, K>(state, id, method, { args, from }));
    const contractCallExists = contractCall != undefined;

    const argsHash = JSON.stringify(args);
    const callSyncedAction = useMemo(() => {
        if (networkId && address && method && web3ContractExists) {
            if (fetch === 'ifnull' && !contractCallExists) {
                return callSynced({
                    networkId,
                    address,
                    method: method as string,
                    args,
                    from,
                    sync: 'once',
                });
            } else if (!!fetch && fetch != 'ifnull') {
                return callSynced({
                    networkId,
                    address,
                    method: method as string,
                    args,
                    from,
                    sync: fetch,
                });
            }
        }
    }, [networkId, address, method, argsHash, web3ContractExists, fetch]);
    const syncId = callSyncedAction?.payload.sync?.id;

    const callUnsyncAction = useMemo(() => {
        if (syncId) return callUnsync(syncId);
        return undefined;
    }, [syncId]);

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

/** @category Hooks */
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

export default useContractCall;

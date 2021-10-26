import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseWeb3Contract, callArgsHash } from '../model';
import { callSynced, callUnsync } from '../actions';
import { selectContractCallByAddress, selectByAddressSingle as selectContractByAddressSingle } from '../selector';
import { Await } from '../../types/promise';
import { Sync } from '../../sync/model';

//Contract Call
export interface UseContractCallOptions {
    from?: string;
    gas?: string;
    sync?: Sync | Sync['type'] | boolean;
}

export interface HookHandlers {
    subscribe: () => void;
    unsubscribe: () => void;
}
export function useContractCall<T extends BaseWeb3Contract = BaseWeb3Contract, K extends keyof T['methods'] = string>(
    networkId?: string,
    address?: string,
    method?: K,
    args?: Parameters<T['methods'][K]>,
    options?: UseContractCallOptions,
): [Await<ReturnType<ReturnType<T['methods'][K]>['call']>> | undefined, HookHandlers] {
    const { from, sync } = options ?? {};

    const contract = useSelector((state) => selectContractByAddressSingle<T>(state, networkId, address));

    const argsHash = callArgsHash({ args, from });
    const dispatch = useDispatch();
    const contractCall = useSelector((state) =>
        selectContractCallByAddress<T, K>(state, networkId, address, method, { args, from }),
    );

    //Recompute subscribe function if network/contract is created, otherwise function is void
    const subscribe = useCallback(() => {
        if (networkId && address && method && contract) {
            dispatch(
                callSynced({
                    networkId,
                    address,
                    method: method as string,
                    args,
                    from,
                    sync,
                }),
            );
        }
    }, [networkId, address, method, argsHash, sync, dispatch, contract]);

    const unsubscribe = useCallback(() => {
        if (networkId && address && method && contract) {
            dispatch(
                callUnsync({
                    networkId,
                    address,
                    method: method as string,
                    args,
                    from,
                }),
            );
        }
    }, [networkId, address, method, argsHash, dispatch, contract]);

    useEffect(() => {
        subscribe();

        return () => {
            unsubscribe();
        };
    }, [networkId, address, method, argsHash, sync, dispatch, contract]);

    return [contractCall, { subscribe, unsubscribe }];
}

export function contractCallHookFactory<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['methods'] = string,
>(method: K) {
    return (
        networkId?: string,
        address?: string,
        args?: Parameters<T['methods'][K]>,
        options?: UseContractCallOptions,
    ) => {
        return useContractCall<T, K>(networkId, address, method, args, options);
    };
}

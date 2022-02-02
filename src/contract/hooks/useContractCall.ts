import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Await } from '../../types/promise';

import { remove as removeSync } from '../../sync/actions';
import { GenericSync } from '../../sync/model';

import { BaseWeb3Contract } from '../model';
import { callSynced } from '../actions';
import selectSingle from '../selectors/selectByIdSingle';
import selectContractCall from '../selectors/selectContractCallById';

//Contract Call
/** @internal */
export interface UseContractCallOptions {
    from?: string;
    gas?: string;
    sync?: 'ifnull' | GenericSync | false;
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
): Await<ReturnType<ReturnType<T['methods'][K]>['call']>> | undefined {
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
    const callSyncId = callSyncedAction?.payload.sync?.id;
    const callId = callSyncedAction?.payload.callId;

    //Send new Sync when id changes
    //We do NOT do an object comparison as shallow compare would lead to infinite loop

    console.debug({ loc: 'A', method, fetch, callId, callSyncId });
    useEffect(() => {
        console.debug({ loc: 'B', method, fetch, callId, callSyncId });
    });
    useEffect(() => {
        console.debug({ loc: 'C', method, fetch, callId, callSyncId });
    }, []);
    useEffect(() => {
        console.debug({ loc: 'D', method, fetch, callId, callSyncId });
        if (callSyncedAction) dispatch(callSyncedAction);
        return () => {
            if (callSyncId) dispatch(removeSync(callSyncId));
        };
    }, [dispatch, callId, callSyncId]);

    return contractCall;
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

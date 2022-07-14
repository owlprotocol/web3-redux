import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Await } from '../../types/promise.js';

import { GenericSync } from '../../sync/model/index.js';

import { BaseWeb3Contract } from '../model/index.js';
import { callSynced, call } from '../actions/index.js';
import EthCallCRUD from '../../ethcall/crud.js';
import ContractCRUD from '../crud.js';
import SyncCRUD from '../../sync/crud.js';
import ErrorCRUD from '../../error/crud.js';

//Contract Call
/** @internal */
export interface UseContractCallOptions {
    from?: string;
    gas?: number;
    sync?: 'ifnull' | GenericSync | false;
}

/**
 * Create a contract call and return value.
 * @category Hooks
 */
export function useContractCall<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['methods'] = string,
    P extends Partial<Parameters<T['methods'][K]>> = any,
    >(
        networkId: string | undefined,
        address: string | undefined,
        method: K | undefined,
        args?: P,
        options?: UseContractCallOptions,
) {
    const sync = options?.sync ?? 'ifnull';

    const dispatch = useDispatch();
    const contract = ContractCRUD.hooks.useSelectByIdSingle({ networkId, address });
    const web3Contract = contract?.web3Contract ?? contract?.web3SenderContract;
    const web3ContractMethod = web3Contract?.methods[method];
    const web3ContractMethodExists = !!web3ContractMethod;

    const data = useMemo(() => {
        if (web3ContractMethod) {
            let tx: any;
            if (!args || args.length == 0) tx = web3ContractMethod();
            else tx = web3ContractMethod(...(args as any[]));

            const data = tx.encodeABI();
            return data;
        }
    }, [web3ContractMethod]);

    const [ethCall, { isLoading: ethCallLoading }] = EthCallCRUD.hooks.useGet({
        networkId,
        to: address,
        data,
    });
    const returnValue = ethCall?.returnValue as Await<ReturnType<ReturnType<T['methods'][K]>['call']>> | undefined;
    const executeSync = sync != false;

    const { callAction, syncAction } =
        useMemo(() => {
            if (networkId && address && method && web3ContractMethodExists) {
                if (!!sync && sync != 'ifnull' && sync != 'once') {
                    return callSynced({
                        networkId,
                        address,
                        method: method as string,
                        args: args as any[],
                        sync,
                    });
                } else {
                    const callAction = call({
                        networkId,
                        address,
                        method: method as string,
                        args: args as any[],
                        ifnull: sync === 'ifnull',
                    });
                    return { callAction, syncAction: undefined };
                }
            }
        }, [networkId, address, method, web3ContractMethodExists, JSON.stringify(args), JSON.stringify(sync)]) ?? {};

    //Error
    const [reduxError] = ErrorCRUD.hooks.useGet(callAction?.meta.uuid);
    const error = useMemo(() => {
        if (!networkId) return new Error('networkId undefined');
        else if (!address) return new Error('address undefined');
        else if (!method) return new Error('method undefined');
        else if (!web3ContractMethodExists)
            return new Error(`method ${method as string} does not exist on ${networkId}-${address}`);
        else if (!!reduxError) {
            const err = new Error(reduxError.errorMessage);
            err.stack = reduxError.stack;
            return err;
        }
    }, [networkId, address, method, web3Contract, reduxError]);

    //Callback
    const dispatchCallAction = useCallback(() => {
        if (callAction) dispatch(callAction);
    }, [dispatch, callAction]);
    //Initial call
    useEffect(() => {
        if (executeSync) dispatchCallAction();
    }, [dispatchCallAction, executeSync]);

    const syncId = syncAction?.payload.id;
    useEffect(() => {
        if (syncAction) dispatch(syncAction);
        return () => {
            if (syncId) dispatch(SyncCRUD.actions.delete({ id: syncId }));
        };
    }, [dispatch, syncId]);

    const isLoading = ethCallLoading || ethCallLoading;
    const returnOptions = { error, dispatchCallAction, isLoading, callAction, syncAction };
    return [returnValue, returnOptions] as [typeof returnValue, typeof returnOptions];
}

/**
 * Factory method for contract call hook
 * @category Hooks
 */
export function contractCallHookFactory<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['methods'] = string,
    >(method: K) {
    return (
        networkId: string | undefined,
        address: string | undefined,
        args?: Partial<Parameters<T['methods'][K]>>,
        options?: UseContractCallOptions,
    ) => {
        return useContractCall<T, K>(networkId, address, method, args, options);
    };
}

export default useContractCall;

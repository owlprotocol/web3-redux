import { useCallback, useEffect, useMemo } from 'react';
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

export interface UseContractCallReturnOptions {
    error: Error | undefined;
    dispatchCallAction: () => void;
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
): [Await<ReturnType<ReturnType<T['methods'][K]>['call']>> | undefined, UseContractCallReturnOptions] {
    const sync = options?.sync ?? 'ifnull';
    const from = options?.from;
    const gas = options?.gas;

    const dispatch = useDispatch();
    const contract = ContractCRUD.hooks.useSelectByIdSingle({ networkId, address });
    const web3Contract = contract?.web3Contract ?? contract?.web3SenderContract;
    const web3ContractMethod = web3Contract?.methods[method];

    const data = useMemo(() => {
        if (web3ContractMethod) {
            let tx: any;
            if (!args || args.length == 0) tx = web3ContractMethod();
            else tx = web3ContractMethod(...(args as any[]));

            const data = tx.encodeABI();
            return data;
        }
    }, [web3ContractMethod]);

    const ethCallResponse = EthCallCRUD.hooks.useGet({
        networkId,
        to: address,
        data,
        from,
        gas,
    });
    const ethCallLoading = ethCallResponse === 'loading';
    const ethCall = ethCallLoading ? undefined : ethCallResponse;
    const returnValue = ethCall?.returnValue;
    const returnValueExists = returnValue != undefined;

    const argsHash = JSON.stringify(args);
    const { callAction, syncAction } =
        useMemo(() => {
            if (!ethCallLoading && networkId && address && method) {
                if (sync === 'once' || (!returnValueExists && sync === 'ifnull')) {
                    const callAction = call({
                        networkId,
                        address,
                        method: method as string,
                        args: args as any[],
                        from,
                    });
                    return { callAction, syncAction: undefined };
                } else if (!!sync && sync != 'ifnull') {
                    return callSynced({
                        networkId,
                        address,
                        method: method as string,
                        args: args as any[],
                        from,
                        sync,
                    });
                }
            }
        }, [ethCallLoading, networkId, address, method, argsHash, returnValueExists, JSON.stringify(sync)]) ?? {};

    //Error
    const reduxErrorResponse = ErrorCRUD.hooks.useGet(callAction?.meta.uuid);
    const reduxError = reduxErrorResponse === 'loading' ? undefined : reduxErrorResponse;
    const error = useMemo(() => {
        if (!networkId) return new Error('networkId undefined');
        else if (!address) return new Error('address undefined');
        else if (!method) return new Error('method undefined');
        else if (!!reduxError) {
            const err = new Error(reduxError.errorMessage);
            err.stack = reduxError.stack;
            return err;
        }
    }, [networkId, address, method, reduxError]);

    const callId = callAction?.payload.id;
    const dispatchCallAction = useCallback(() => {
        if (callAction) dispatch(callAction);
    }, [dispatch, callId]);
    useEffect(() => {
        if (!!sync) dispatchCallAction();
    }, [dispatchCallAction]);

    const syncId = syncAction?.payload.id;
    useEffect(() => {
        if (syncAction) dispatch(syncAction);
        return () => {
            if (syncId) dispatch(SyncCRUD.actions.delete({ id: syncId }));
        };
    }, [dispatch, syncId]);

    return [returnValue, { error, dispatchCallAction }];
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

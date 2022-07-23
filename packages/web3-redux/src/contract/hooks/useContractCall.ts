import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Await } from '../../types/promise.js';

import { GenericSync } from '../../sync/model/index.js';

import { BaseWeb3Contract, ContractWithObjects } from '../model/index.js';
import { callSynced, call, CallAction } from '../actions/index.js';
import EthCallCRUD from '../../ethcall/crud.js';
import SyncCRUD from '../../sync/crud.js';
import ErrorCRUD from '../../error/crud.js';
import ContractCRUD from '../crud.js';

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
    address2: string | undefined,
    method: K | undefined,
    args?: P,
    options?: UseContractCallOptions,
) {
    const address = address2?.toLowerCase();
    const sync = options?.sync ?? 'ifnull';
    const dispatch = useDispatch();
    const [contract] = ContractCRUD.hooks.useHydrate({ networkId, address });
    const web3Contract = (contract as ContractWithObjects | undefined)?.web3Contract;
    const contractExists = !!web3Contract;
    const [ethCall, { isLoading: ethCallLoading }] = EthCallCRUD.hooks.useGet({
        networkId,
        to: address,
        methodName: method as string,
        argsHash: JSON.stringify(args ?? []),
    });
    const returnValue = ethCall?.returnValue as Await<ReturnType<ReturnType<T['methods'][K]>['call']>> | undefined;
    const executeCall = contractExists && sync != false;
    //Actions
    const [callAction, setCallAction] = useState<CallAction | undefined>();
    const [syncAction, setSyncAction] = useState<ReturnType<typeof SyncCRUD.actions.create> | undefined>();

    const argsHash = JSON.stringify(args);
    const syncHash = JSON.stringify(sync);

    useEffect(() => {
        if (networkId && address && method) {
            if (!!sync && sync != 'ifnull' && sync != 'once') {
                const { callAction, syncAction } = callSynced({
                    networkId,
                    address,
                    method: method as string,
                    args: args as any[],
                    sync,
                });
                setCallAction(callAction);
                setSyncAction(syncAction);
            } else {
                const callAction = call({
                    networkId,
                    address,
                    method: method as string,
                    args: args as any[],
                    ifnull: sync === 'ifnull',
                });
                setCallAction(callAction);
                setSyncAction(undefined);
            }
        } else {
            setCallAction(undefined);
            setSyncAction(undefined);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [networkId, address, method, argsHash, syncHash]);

    //Error
    const [reduxError] = ErrorCRUD.hooks.useGet(callAction?.meta.uuid);
    const [error, setError] = useState<Error | undefined>();
    useEffect(() => {
        if (!networkId) setError(new Error('networkId undefined'));
        else if (!address) setError(new Error('address undefined'));
        else if (!method) setError(new Error('method undefined'));
        else if (!!reduxError) {
            const err = new Error(reduxError.errorMessage);
            err.stack = reduxError.stack;
            setError(err);
        } else {
            setError(undefined);
        }
    }, [networkId, address, method, reduxError]);

    //Callback
    const dispatchCallAction = useCallback(() => {
        if (callAction) dispatch(callAction);
    }, [dispatch, callAction]);
    //Effects
    useEffect(() => {
        if (executeCall) dispatchCallAction();
    }, [dispatchCallAction, executeCall]);

    useEffect(() => {
        if (syncAction) {
            dispatch(syncAction);
            return () => {
                dispatch(SyncCRUD.actions.delete({ id: syncAction.payload.id }));
            };
        }
    }, [dispatch, syncAction]);

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

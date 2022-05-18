import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Await } from '../../types/promise.js';

import { remove as removeSync } from '../../sync/actions/index.js';
import { GenericSync } from '../../sync/model/index.js';

import { BaseWeb3Contract } from '../model/index.js';
import { callSynced, call } from '../actions/index.js';
import selectContractCall from '../selectors/selectContractCallById.js';
import { selectByIdSingle as selectReduxError } from '../../error/selectors/index.js';

//Contract Call
/** @internal */
export interface UseContractCallOptions {
    from?: string;
    gas?: string;
    sync?: 'ifnull' | GenericSync | false;
}


interface UseContractCallReturnOptions {
    error: Error | undefined;
    dispatchCallAction: () => void;
}
/**
 * Create a contract call and return value.
 * @category Hooks
 */
export function useContractCall<T extends BaseWeb3Contract = BaseWeb3Contract, K extends keyof T['methods'] = string>(
    networkId: string | undefined,
    address: string | undefined,
    method: K | undefined,
    args?: Parameters<T['methods'][K]>,
    options?: UseContractCallOptions,
): [Await<ReturnType<ReturnType<T['methods'][K]>['call']>> | undefined, UseContractCallReturnOptions] {
    let error: Error | undefined;
    const sync = options?.sync ?? 'ifnull';
    const from = options?.from;

    const dispatch = useDispatch();
    const id = networkId && address ? { networkId, address } : undefined;

    //const contract = useSelector((state) => selectSingle<T>(state, id));

    const returnValue = useSelector((state) => selectContractCall(state, id, method, { args, from }));
    //const contractCall = useSelector((state) => selectContractCall<T, K>(state, id, method, { args, from }));
    const returnValueExists = returnValue != undefined;

    const argsHash = JSON.stringify(args);
    const { callAction, syncAction } =
        useMemo(() => {
            if (sync === 'ifnull' && !returnValueExists) {
                return callSynced({
                    networkId,
                    address,
                    method: method as string | undefined,
                    args,
                    from,
                    sync: 'once',
                });
            } else if (!!sync && sync != 'ifnull') {
                return callSynced({
                    networkId,
                    address,
                    method: method as string | undefined,
                    args,
                    from,
                    sync,
                });
            } else if (!sync) {
                const callAction = call({
                    networkId,
                    address,
                    method: method as string | undefined,
                    args,
                    from,
                });
                return { callAction, syncAction: undefined };
            }
        }, [networkId, address, method, argsHash, JSON.stringify(sync)]) ?? {};

    const reduxError = useSelector((state) => selectReduxError(state, callAction?.meta.uuid));
    if (reduxError) error = reduxError.error;

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
            if (syncId) dispatch(removeSync(syncId));
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
        args?: Parameters<T['methods'][K]>,
        options?: UseContractCallOptions,
    ) => {
        return useContractCall<T, K>(networkId, address, method, args, options);
    };
}

export default useContractCall;

import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Await } from '../../types/promise.js';

import { GenericSync } from '../../sync/model/index.js';

import { BaseWeb3Contract } from '../model/index.js';
import { callSynced, call } from '../actions/index.js';
import EthCallCRUD from '../../ethcall/crud.js';
import ContractCRUD from '../crud.js';
import SyncCRUD from '../../sync/crud.js';

//Contract Call
/** @internal */
export interface UseContractCallOptions {
    from?: string;
    gas?: number;
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
    const gas = options?.gas;

    const dispatch = useDispatch();
    const id = networkId && address ? { networkId, address } : undefined;

    const contract = ContractCRUD.hooks.useSelectByIdSingle(id);
    const web3Contract = contract?.web3Contract ?? contract?.web3SenderContract;
    const web3ContractMethod = web3Contract?.methods[method];

    const data = useMemo(() => {
        if (web3ContractMethod) {
            let tx: any;
            if (!args || args.length == 0) tx = web3ContractMethod();
            else tx = web3ContractMethod(...args);

            const data = tx.encodeABI();
            return data;
        }
    }, [web3ContractMethod]);

    const ethCall = EthCallCRUD.hooks.useGet({
        networkId,
        to: address,
        data,
        from,
        gas,
    });
    const returnValue = ethCall?.returnValue;
    //const contractCall = useSelector((state) => selectContractCall<T, K>(state, id, method, { args, from }));
    const returnValueExists = returnValue != undefined;

    const argsHash = JSON.stringify(args);
    const { callAction, syncAction } =
        useMemo(() => {
            if (networkId && address && method && sync === 'ifnull' && !returnValueExists) {
                return callSynced({
                    networkId,
                    address,
                    method: method as string,
                    args,
                    from,
                    sync: 'once',
                });
            } else if (networkId && address && method && !!sync && sync != 'ifnull') {
                return callSynced({
                    networkId,
                    address,
                    method: method as string,
                    args,
                    from,
                    sync,
                });
            } else if (networkId && address && method && !sync) {
                const callAction = call({
                    networkId,
                    address,
                    method: method as string,
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
            if (syncId) dispatch(SyncCRUD.actions.delete(syncId));
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

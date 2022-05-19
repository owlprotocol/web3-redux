import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseWeb3Contract } from '../model/index.js';
import { send } from '../actions/index.js';
import { selectByIdSingle as selectReduxError } from '../../error/selectors/index.js';

/**
 * useContractSend options
 * @internal
 */
export interface UseContractSendOptions {
    value?: string;
    from?: string;
}


/**
 * Create a contract send transaction callback method.
 * @category Hooks
 */
export function useContractSend<T extends BaseWeb3Contract = BaseWeb3Contract, K extends keyof T['methods'] = string>(
    networkId: string | undefined,
    address: string | undefined,
    method: K | undefined,
    args?: Parameters<T['methods'][K]>,
    options?: UseContractSendOptions
): [() => void, { error: Error | undefined }] {
    let error: Error | undefined;
    const { value, from } = options ?? {};
    const dispatch = useDispatch();

    const sendAction = useMemo(() => {
        return send({
            networkId,
            address,
            method: method as string,
            args,
            value,
            from,
        })
    }, [networkId, address, method, JSON.stringify(args), value, args])

    const sendCallback = useCallback(
        () => {
            dispatch(
                sendAction
            );
        },
        [sendAction, dispatch],
    );

    const reduxError = useSelector((state) => selectReduxError(state, sendAction?.meta.uuid));
    if (reduxError) error = reduxError.error;

    return [sendCallback, { error }];
}

/** @category Hooks */
export function contractSendHookFactory<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['methods'] = string,
    >(method: K) {
    return (networkId: string | undefined, address: string | undefined) => {
        return useContractSend<T, K>(networkId, address, method);
    };
}

export default useContractSend;

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseWeb3Contract } from '../model';
import { send } from '../actions';
import selectSingle from '../selectors/selectByIdSingle';

//Contract Send
export function useContractSend<T extends BaseWeb3Contract = BaseWeb3Contract, K extends keyof T['methods'] = string>(
    networkId: string | undefined,
    address: string | undefined,
    method: K | undefined,
) {
    const id = networkId && address ? { networkId, address } : undefined;
    const contract = useSelector((state) => selectSingle<T>(state, id));
    const contractExists = !!contract;

    const dispatch = useDispatch();

    const sendCallback = useCallback(
        ({ args, value, from }: { args: Parameters<T['methods'][K]>; value?: string; from: string }) => {
            if (networkId && address && method && contractExists) {
                dispatch(
                    send({
                        networkId,
                        address,
                        method: method as string,
                        args,
                        value,
                        from,
                    }),
                );
            }
        },
        [networkId, address, method, dispatch, contractExists],
    );

    return sendCallback;
}

export function contractSendHookFactory<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['methods'] = string,
>(method: K) {
    return (networkId: string | undefined, address: string | undefined) => {
        return useContractSend<T, K>(networkId, address, method);
    };
}

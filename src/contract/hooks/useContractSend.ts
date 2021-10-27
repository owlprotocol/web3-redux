import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseWeb3Contract } from '../model';
import { send } from '../actions';
import { selectByAddressSingle as selectContractByAddressSingle } from '../selector';

//Contract Send
export function useContractSend<T extends BaseWeb3Contract = BaseWeb3Contract, K extends keyof T['methods'] = string>(
    networkId?: string,
    address?: string,
    method?: K,
) {
    const contract = useSelector((state) => selectContractByAddressSingle<T>(state, networkId, address));
    const contractExists = !!contract;

    const dispatch = useDispatch();

    const sendCallback = useCallback(
        ({ args, value, from }: { args: Parameters<T['methods'][K]>; value: string; from: string }) => {
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
    return (networkId?: string, address?: string) => {
        return useContractSend<T, K>(networkId, address, method);
    };
}

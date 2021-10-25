import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AbiItem } from 'web3-utils';
import { selectByIdSingle as selectNetworkByIdSingle } from '../../network/selector';
import { BaseWeb3Contract } from '../model';
import { create } from '../actions';
import { selectByAddressSingle as selectContractByAddressSingle } from '../selector';

export function useContract<T extends BaseWeb3Contract = BaseWeb3Contract>(
    networkId?: string,
    address?: string,
    abi?: any,
) {
    const dispatch = useDispatch();

    const network = useSelector((state) => selectNetworkByIdSingle(state, networkId));
    const contract = useSelector((state) => selectContractByAddressSingle<T>(state, networkId, address));

    useEffect(() => {
        if (networkId && address && abi && network && !contract) {
            dispatch(create({ networkId, address, abi }));
        }
    }, [networkId, address, dispatch, network, contract]);

    return contract;
}

export function contractHookFactory<T extends BaseWeb3Contract = BaseWeb3Contract>(abi: AbiItem[]) {
    return (networkId?: string, address?: string) => {
        return useContract<T>(networkId, address, abi);
    };
}

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AbiItem } from 'web3-utils';
import { selectByIdSingle as selectNetworkByIdSingle } from '../../network/selectors';
import { BaseWeb3Contract } from '../model';
import { create } from '../actions';
import selectSingle from '../selectors/selectByIdSingle';

export function useContract<T extends BaseWeb3Contract = BaseWeb3Contract>(
    networkId: string | undefined,
    address: string | undefined,
    abi: any | undefined,
) {
    const dispatch = useDispatch();

    const network = useSelector((state) => selectNetworkByIdSingle(state, networkId));
    const contract = useSelector((state) =>
        selectSingle<T>(state, networkId && address ? { networkId, address } : undefined),
    );
    const networkExists = !!network;
    const contractExists = !!contract;

    useEffect(() => {
        if (networkId && address && abi && networkExists && !contractExists) {
            dispatch(create({ networkId, address, abi }));
        }
    }, [networkId, address, dispatch, networkExists, contractExists]);

    return contract;
}

export function contractHookFactory<T extends BaseWeb3Contract = BaseWeb3Contract>(abi: AbiItem[]) {
    return (networkId: string | undefined, address: string | undefined) => {
        return useContract<T>(networkId, address, abi);
    };
}

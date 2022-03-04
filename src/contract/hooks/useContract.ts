import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AbiItem } from 'web3-utils';
import useGetBalance from './useGetBalance';
import useGetNonce from './useGetNonce';
import useGetCode from './useGetCode';
import useFetchAbi from './useFetchAbi';
import { create } from '../actions';
import { GetBalanceSyncedActionInput } from '../actions/getBalanceSynced';
import { GetNonceSyncedActionInput } from '../actions/getNonceSynced';
import { selectByIdSingle } from '../selectors';
import { BaseWeb3Contract } from '../model';

/**
 * Creates a contract/EOA if it doesn't exist.
 * Reads ethereum data and optionally syncs data.
 * 'once' always refreshes, 'ifnull' should refresh only if empty
 * @category Hooks
 *
 */
export function useContract<T extends BaseWeb3Contract = BaseWeb3Contract>(
    networkId: string | undefined,
    address: string | undefined,
    abi?: AbiItem[] | undefined,
    sync?: {
        getBalance?: 'ifnull' | GetBalanceSyncedActionInput['sync'] | false;
        getNonce?: 'ifnull' | GetNonceSyncedActionInput['sync'] | false;
        getCode?: 'ifnull' | true | false;
        fetchAbi?: 'ifnull' | true | false;
    },
) {
    const dispatch = useDispatch();
    const id = networkId && address ? { networkId, address } : undefined;

    const contract = useSelector((state) => selectByIdSingle<T>(state, id));
    const contractExists = !!contract;

    //Default sync params
    const getBalance = sync?.getBalance ?? false;
    const getNonce = sync?.getNonce ?? false;
    const getCode = sync?.getCode ?? false;
    const fetchAbi = sync?.fetchAbi ?? false;

    //Create contract if inexistant
    useEffect(() => {
        if (id && !contractExists) dispatch(create({ ...id, abi }));
    }, [dispatch, id, abi, contractExists]);

    useGetBalance(networkId, address, getBalance);
    useGetNonce(networkId, address, getNonce);
    useGetCode(networkId, address, getCode);
    useFetchAbi(networkId, address, fetchAbi);

    return contract;
}

/** @category Hooks */
export function contractHookFactory<T extends BaseWeb3Contract = BaseWeb3Contract>(abi: AbiItem[]) {
    return (networkId: string | undefined, address: string | undefined) => {
        return useContract<T>(networkId, address, abi);
    };
}

export default useContract;

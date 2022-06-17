import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetBalance } from './useGetBalance.js';
import { useGetNonce } from './useGetNonce.js';
import { useGetCode } from './useGetCode.js';
import { useFetchAbi } from './useFetchAbi.js';
import { AbiItem } from '../../utils/web3-utils/index.js';
import { createAction } from '../actions/index.js';
import { GetBalanceSyncedActionInput } from '../actions/getBalanceSynced.js';
import { GetNonceSyncedActionInput } from '../actions/getNonceSynced.js';
import { selectByIdSingle } from '../selectors/index.js';
import { BaseWeb3Contract, Contract } from '../model/index.js';

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
    createData: Partial<Contract> = {},
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
        if (id && !contractExists) dispatch(createAction({ ...id, ...createData }));
    }, [dispatch, id, JSON.stringify(createData), contractExists]);

    useGetBalance(networkId, address, getBalance);
    useGetNonce(networkId, address, getNonce);
    useGetCode(networkId, address, getCode);
    useFetchAbi(networkId, address, fetchAbi);

    return contract;
}

/** @category Hooks */
export function contractHookFactory<T extends BaseWeb3Contract = BaseWeb3Contract>(createData: Partial<Contract> = {}) {
    return (networkId: string | undefined, address: string | undefined) => {
        return useContract<T>(networkId, address, createData);
    };
}

export default useContract;

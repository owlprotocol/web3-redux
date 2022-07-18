import { useGetBalance } from './web3/useGetBalance.js';
import { useGetNonce } from './web3/useGetNonce.js';
import { useGetCode } from './web3/useGetCode.js';
import { useFetchAbi } from './useFetchAbi.js';
import { GetBalanceSyncedActionInput } from '../actions/getBalanceSynced.js';
import { GetNonceSyncedActionInput } from '../actions/getNonceSynced.js';
import { Contract } from '../model/index.js';
import ContractCRUD from '../crud.js';

/**
 * Creates a contract/EOA if it doesn't exist.
 * Reads ethereum data and optionally syncs data.
 * 'once' always refreshes, 'ifnull' should refresh only if empty
 * @category Hooks
 *
 */
export function useContract(
    networkId: string | undefined,
    address: string | undefined,
    defaultContract?: Partial<Contract>,
    sync?: {
        getBalance?: 'ifnull' | GetBalanceSyncedActionInput['sync'] | false;
        getNonce?: 'ifnull' | GetNonceSyncedActionInput['sync'] | false;
        getCode?: 'ifnull' | false;
        fetchAbi?: 'ifnull' | true | false;
    },
) {
    //Default sync params
    const getBalance = sync?.getBalance ?? false;
    const getNonce = sync?.getNonce ?? false;
    const getCode = sync?.getCode ?? false;
    const fetchAbi = sync?.fetchAbi ?? false;

    const data = networkId && address ? { ...defaultContract, networkId: networkId, address: address } : undefined;

    const contract = ContractCRUD.hooks.useHydrate({ networkId, address }, data);
    useGetBalance(networkId, address, getBalance);
    useGetNonce(networkId, address, getNonce);
    useGetCode(networkId, address, getCode);
    useFetchAbi(networkId, address, fetchAbi);

    return contract;
}

/** @category Hooks */
export function contractHookFactory(createData: Contract) {
    return (networkId: string | undefined, address: string | undefined) => {
        return useContract(networkId, address, createData);
    };
}

export default useContract;

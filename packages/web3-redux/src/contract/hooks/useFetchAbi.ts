import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import NetworkCRUD from '../../network/crud.js';
import { fetchAbi } from '../actions/index.js';
import ContractCRUD from '../crud.js';

/**
 * Fetch Contract ABI
 * @category Hooks
 *
 */
export function useFetchAbi(
    networkId: string | undefined,
    address: string | undefined,
    fetch = 'ifnull' as 'ifnull' | true | false,
) {
    const dispatch = useDispatch();

    const contract = ContractCRUD.hooks.useSelectByIdSingle({ networkId, address });
    const network = NetworkCRUD.hooks.useSelectByIdSingle(networkId);
    const contractExists = !!contract;
    const explorerApiExists = !!network?.explorerApiClient;
    const abiExists = !!contract?.abi;

    //Fetch abi (Etherscan)
    const fetchAbiAction = useMemo(() => {
        if (
            networkId &&
            address &&
            explorerApiExists &&
            contractExists &&
            ((fetch === 'ifnull' && !abiExists) || fetch === true)
        ) {
            return fetchAbi({ networkId, address });
        }
    }, [networkId, address, contractExists, explorerApiExists, fetch]);

    useEffect(() => {
        if (fetchAbiAction) dispatch(fetchAbiAction);
    }, [dispatch, fetchAbiAction]);

    return contract?.abi;
}

export default useFetchAbi;

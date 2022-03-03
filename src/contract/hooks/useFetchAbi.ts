import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectByIdSingle as selectNetworkByIdSingle } from '../../network/selectors';
import { fetchAbi } from '../actions';
import { selectByIdSingle } from '../selectors';

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
    const id = networkId && address ? { networkId, address } : undefined;

    const contract = useSelector((state) => selectByIdSingle(state, id));
    const network = useSelector((state) => selectNetworkByIdSingle(state, networkId));
    const contractExists = !!contract;
    const explorerApiExists = !!network?.explorerApiClient;
    const abiExists = !!contract?.abi;

    //Fetch abi (Etherscan)
    const fetchAbiAction = useMemo(() => {
        if (id && explorerApiExists && contractExists && ((fetch === 'ifnull' && !abiExists) || fetch === true)) {
            return fetchAbi({ ...id });
        }
    }, [id, contractExists, explorerApiExists, fetch]);

    useEffect(() => {
        if (fetchAbiAction) dispatch(fetchAbiAction);
    }, [dispatch, fetchAbiAction]);

    return contract?.abi;
}

export default useFetchAbi;

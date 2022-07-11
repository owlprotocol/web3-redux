import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { fetch as fetchAction } from '../actions/index.js';
import BlockCRUD from '../crud.js';
import NetworkCRUD from '../../network/crud.js';

/**
 * Reads block from store and makes a call to fetch block.
 * @category Hooks
 * */
export const useBlock = (
    networkId: string | undefined,
    number: number | undefined,
    fetch = 'ifnull' as 'ifnull' | true | false,
    returnTransactionObjects = false,
) => {
    const dispatch = useDispatch();

    const network = NetworkCRUD.hooks.useSelectByIdSingle(networkId);
    const blockResponse = BlockCRUD.hooks.useGet({ networkId, number });
    const loading = blockResponse === 'loading';
    const block = loading ? undefined : blockResponse;
    const blockExists = !!block;
    const web3Exists = !!(network?.web3 ?? network?.web3Sender);

    const action = useMemo(() => {
        if (!loading && networkId && number && web3Exists) {
            if ((!blockExists && fetch === 'ifnull') || fetch === true) {
                return fetchAction({ networkId, blockHashOrBlockNumber: number, returnTransactionObjects });
            }
        }
    }, [loading, networkId, number, web3Exists, blockExists, fetch, returnTransactionObjects]);

    useEffect(() => {
        if (action) dispatch(action);
    }, [dispatch, action]);

    return block;
};

export default useBlock;

import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectByIdSingle as selectNetwork } from '../../network/selectors';
import { selectByIdSingle as selectBlock } from '../selectors';
import { fetch as fetchAction } from '../actions';

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

    const network = useSelector((state) => selectNetwork(state, networkId));
    const id = networkId && number ? { networkId, number } : undefined;
    const block = useSelector((state) => selectBlock(state, id));
    const web3Exists = !!(network?.web3 ?? network?.web3Sender);

    const fetchCallback = useCallback(() => {
        if (networkId && number && web3Exists && ((fetch === 'ifnull' && !block) || fetch === true)) {
            dispatch(fetchAction({ networkId, blockHashOrBlockNumber: number, returnTransactionObjects }));
        }
    }, [networkId, number, fetch, returnTransactionObjects, dispatch, web3Exists]);

    useEffect(() => {
        fetchCallback();
    }, [fetchCallback]);

    return [block];
};

export default useBlock;

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectByIdSingle as selectNetwork } from '../../network/selectors/index.js';
import { selectByIdSingle as selectBlock } from '../selectors/index.js';
import { fetch as fetchAction } from '../actions/index.js';

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

    const action = useMemo(() => {
        if (networkId && number && web3Exists && ((fetch === 'ifnull' && !block) || fetch === true)) {
            return fetchAction({ networkId, blockHashOrBlockNumber: number, returnTransactionObjects });
        }
    }, [networkId, number, fetch, returnTransactionObjects, web3Exists]);

    useEffect(() => {
        if (action) dispatch(action);
    }, [dispatch, action]);

    return block;
};

export default useBlock;

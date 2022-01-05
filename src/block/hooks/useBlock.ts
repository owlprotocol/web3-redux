import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectByIdSingle as selectNetwork } from '../../network/selectors';
import { selectByIdSingle as selectBlock } from '../selectors';
import { fetch as fetchAction } from '../actions';

/**
 * Reads block from store and makes a call to fetch block.
 * @category Hooks
 * */
export const useBlock = (networkId: string | undefined, number: number | undefined, fetch = true) => {
    const dispatch = useDispatch();

    const network = useSelector((state) => selectNetwork(state, networkId));
    const id = networkId && number ? { networkId, number } : undefined;
    const block = useSelector((state) => selectBlock(state, id));
    const networkExists = !!network;

    const fetchCallback = useCallback(() => {
        if (networkId && number && fetch && networkExists) {
            dispatch(fetchAction({ networkId, blockHashOrBlockNumber: number }));
        }
    }, [networkId, number, fetch, dispatch, networkExists]);

    useEffect(() => {
        fetchCallback();
    }, [fetchCallback]);

    return [block];
};

export default useBlock;

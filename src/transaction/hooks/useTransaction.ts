import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectByIdSingle as selectNetwork } from '../../network/selectors';
import { selectByIdSingle as selectTransaction } from '../selectors';
import { fetch as fetchAction } from '../actions';

/**
 * Reads transaction from store and makes a call to fetch transaction.
 * @category Hooks
 * */
export const useTransaction = (networkId: string | undefined, hash: string | undefined, fetch = true) => {
    const dispatch = useDispatch();

    const network = useSelector((state) => selectNetwork(state, networkId));
    const id = networkId && hash ? { networkId, hash } : undefined;
    const transaction = useSelector((state) => selectTransaction(state, id));
    const networkExists = !!network;

    const fetchCallback = useCallback(() => {
        if (networkId && hash && fetch && networkExists) {
            dispatch(fetchAction({ networkId, hash }));
        }
    }, [networkId, hash, fetch, dispatch, networkExists]);

    useEffect(() => {
        fetchCallback();
    }, [fetchCallback]);

    return [transaction];
};

export default useTransaction;

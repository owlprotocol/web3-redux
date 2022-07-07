import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import NetworkCRUD from '../../network/crud.js';
import { fetch as fetchAction } from '../actions/index.js';
import TransactionCRUD from '../crud.js';

/**
 * Reads transaction from store and makes a call to fetch transaction.
 * @category Hooks
 * */
export const useTransaction = (
    networkId: string | undefined,
    hash: string | undefined,
    fetch = 'ifnull' as 'ifnull' | true | false,
) => {
    const dispatch = useDispatch();

    const network = NetworkCRUD.hooks.useGet({ networkId });
    const transaction = TransactionCRUD.hooks.useGet({ networkId, hash });
    const web3Exists = !!(network?.web3 ?? network?.web3Sender);

    const action = useMemo(() => {
        if (networkId && hash && web3Exists && ((fetch === 'ifnull' && !transaction) || fetch === true)) {
            return fetchAction({ networkId, hash });
        }
    }, [networkId, hash, fetch, dispatch, web3Exists]);

    useEffect(() => {
        if (action) dispatch(action);
    }, [dispatch, action]);

    return transaction;
};

export default useTransaction;

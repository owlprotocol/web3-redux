import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import NetworkCRUD from '../../network/crud.js';
import { fetchAction as fetchAction } from '../actions/index.js';
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

    const network = NetworkCRUD.hooks.useSelectByIdSingle(networkId);
    const transactionResponse = TransactionCRUD.hooks.useGet({ networkId, hash });
    const loading = transactionResponse === 'loading';
    const transaction = loading ? undefined : transactionResponse;
    const transactionExists = !!transaction;
    const web3Exists = !!(network?.web3 ?? network?.web3Sender);

    const action = useMemo(() => {
        if (!loading && networkId && hash && web3Exists) {
            if ((!transactionExists && fetch === 'ifnull') || fetch === true) {
                return fetchAction({ networkId, hash });
            }
        }
    }, [loading, networkId, hash, web3Exists, transactionExists, fetch]);

    useEffect(() => {
        if (action) dispatch(action);
    }, [dispatch, action]);

    return transaction;
};

export default useTransaction;

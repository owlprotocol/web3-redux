import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { fetchTransactions } from '../actions/index.js';
import { FetchTransactionOptions } from '../actions/fetchTransactions.js';
import TransactionCRUD from '../../transaction/crud.js';
import NetworkCRUD from '../../network/crud.js';

/**
 * Fetch transactions from/to contract using Etherscan API
 * @category Hooks
 *
 */
export function useFetchTransactions(
    networkId: string | undefined,
    address: string | undefined,
    options = {} as FetchTransactionOptions,
) {
    const dispatch = useDispatch();
    const { startblock, endblock, page, offset, sort } = options;

    const network = NetworkCRUD.hooks.useSelectByIdSingle(networkId);
    const transactionsFrom = TransactionCRUD.hooks.useWhere({ from: address }) ?? [];
    const transactionsTo = TransactionCRUD.hooks.useWhere({ to: address }) ?? [];
    const transactionsGenesisTx = TransactionCRUD.hooks.useWhere({ contractAddress: address }) ?? [];

    const explorerApiExists = !!network?.explorerApiClient;

    //Fetch transactions (Etherscan)
    const fetchTransactionsAction = useMemo(() => {
        if (networkId && address && explorerApiExists) {
            return fetchTransactions({ networkId, address, ...options });
        }
    }, [networkId, address, startblock, endblock, page, offset, sort, explorerApiExists]);

    useEffect(() => {
        if (fetchTransactionsAction) dispatch(fetchTransactionsAction);
    }, [dispatch, fetchTransactionsAction]);

    return {
        from: transactionsFrom,
        to: transactionsTo,
        genesis: transactionsGenesisTx,
    };
}

export default useFetchTransactions;

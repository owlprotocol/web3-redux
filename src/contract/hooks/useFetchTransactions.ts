import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectByIdSingle as selectNetworkByIdSingle } from '../../network/selectors';
import { selectByFilter } from '../../transaction/selectors';

import { fetchTransactions } from '../actions';
import { FetchTransactionOptions } from '../actions/fetchTransactions';

/**
 * @category Hooks
 * Fetch transactions from/to contract using Etherscan API
 *
 */
export function useFetchTransactions(
    networkId: string | undefined,
    address: string | undefined,
    options = {} as FetchTransactionOptions,
) {
    const dispatch = useDispatch();
    const { startblock, endblock, page, offset, sort } = options;

    const network = useSelector((state) => selectNetworkByIdSingle(state, networkId));
    const transactionsFrom = useSelector((state) => selectByFilter(state, { from: address }));
    const transactionsTo = useSelector((state) => selectByFilter(state, { to: address }));
    const transactionsGenesisTx = useSelector((state) => selectByFilter(state, { contractAddress: address }));
    const explorerApiExists = !!network?.explorerApiUrl;

    //Fetch transactions (Etherscan)
    const fetchTransactionsAction = useMemo(() => {
        if (networkId && address && explorerApiExists) {
            return fetchTransactions({ networkId, address, ...options });
        }
    }, [networkId, address, startblock, endblock, page, offset, sort, explorerApiExists]);

    useEffect(() => {
        if (fetchTransactionsAction) dispatch(fetchTransactionsAction);
    }, [dispatch, fetchTransactionsAction]);

    return [...transactionsGenesisTx, ...transactionsFrom, ...transactionsTo];
}

export default useFetchTransactions;

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectByIdSingle as selectNetworkByIdSingle } from '../../network/selectors';
import { selectByFilter } from '../../transaction/selectors';

import { fetchTransactions } from '../actions';

/**
 * @category Hooks
 * Fetch transactions from/to contract using Etherscan API
 *
 */
export function useFetchTransactions(networkId: string | undefined, address: string | undefined) {
    try {
        const dispatch = useDispatch();

        const network = useSelector((state) => selectNetworkByIdSingle(state, networkId));
        const transactionsFrom = useSelector((state) => selectByFilter(state, { from: address }));
        const transactionsTo = useSelector((state) => selectByFilter(state, { to: address }));
        const transactionsGenesisTx = useSelector((state) => selectByFilter(state, { contractAddress: address }));
        const explorerApiExists = !!network?.explorerApiUrl;

        //Fetch transactions (Etherscan)
        const fetchTransactionsAction = useMemo(() => {
            if (networkId && address && explorerApiExists) {
                return fetchTransactions({ networkId, address });
            }
        }, [networkId, address, explorerApiExists]);

        useEffect(() => {
            if (fetchTransactionsAction) dispatch(fetchTransactionsAction);
        }, [dispatch, fetchTransactionsAction]);

        return [...transactionsGenesisTx, ...transactionsFrom, ...transactionsTo];
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default useFetchTransactions;

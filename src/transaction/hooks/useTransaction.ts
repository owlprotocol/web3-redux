import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectByIdSingle as selectNetwork } from '../../network/selectors';
import { selectByIdSingle as selectTransaction } from '../selectors';
import { fetch as fetchAction } from '../actions';

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

    const network = useSelector((state) => selectNetwork(state, networkId));
    const id = networkId && hash ? { networkId, hash } : undefined;
    const transaction = useSelector((state) => selectTransaction(state, id));
    const web3Exists = !!(network?.web3 ?? network?.web3Sender);

    const action = useMemo(() => {
        if (networkId && hash && web3Exists && ((fetch === 'ifnull' && !transaction) || fetch === true)) {
            return fetchAction({ networkId, hash });
        }
    }, [networkId, hash, fetch, dispatch, web3Exists]);

    useEffect(() => {
        if (action) dispatch(action);
    }, [dispatch, action]);

    return [transaction];
};

export default useTransaction;

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectByIdSingle as selectNetworkByIdSingle } from '../../network/selectors';
import { remove as removeSync } from '../../sync/actions';
import { fetchBalanceSynced } from '../actions';
import { GetBalanceSyncedActionInput } from '../actions/getBalanceSynced';
import { selectByIdSingle } from '../selectors';

/**
 * Get Contract bytecode
 * @category Hooks
 *
 */
export function useGetBalance(
    networkId: string | undefined,
    address: string | undefined,
    fetch = 'ifnull' as 'ifnull' | GetBalanceSyncedActionInput['sync'] | false,
) {
    const dispatch = useDispatch();
    const id = networkId && address ? { networkId, address } : undefined;

    const contract = useSelector((state) => selectByIdSingle(state, id));
    const network = useSelector((state) => selectNetworkByIdSingle(state, networkId));
    const web3Exists = !!(network?.web3 ?? network?.web3Sender);
    const contractExists = !!contract;
    const balanceExists = !!contract?.balance;

    //Get balance
    //ifnull => check if current value is defined
    //other => pass as sync param
    const getBalanceAction = useMemo(() => {
        if (id && web3Exists && contractExists) {
            if (fetch === 'ifnull' && !balanceExists) {
                return fetchBalanceSynced({ ...id, sync: 'once' });
            } else if (!!fetch && fetch != 'ifnull') {
                return fetchBalanceSynced({ ...id, sync: fetch });
            }
        }
    }, [id, contractExists, web3Exists, fetch]);
    const getBalanceSyncId = getBalanceAction?.payload.sync?.id;

    useEffect(() => {
        if (getBalanceAction) {
            dispatch(getBalanceAction);
        }
        return () => {
            if (getBalanceSyncId) dispatch(removeSync(getBalanceSyncId));
        };
    }, [dispatch, getBalanceAction, getBalanceSyncId]); //TODO: remove object dep

    return contract?.balance;
}

export default useGetBalance;

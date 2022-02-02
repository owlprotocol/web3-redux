import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectByIdSingle as selectNetworkByIdSingle } from '../../network/selectors';
import { remove as removeSync } from '../../sync/actions';
import { GenericSync } from '../../sync/model';
import { getBalanceSynced } from '../actions';
import { selectByIdSingle } from '../selectors';

/**
 * Get Contract bytecode
 * @category Hooks
 *
 */
export function useGetBalance(
    networkId: string | undefined,
    address: string | undefined,
    sync = 'ifnull' as 'ifnull' | GenericSync | false,
) {
    try {
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
        const { getBalanceAction, syncAction } =
            useMemo(() => {
                if (networkId && address && web3Exists && contractExists) {
                    if (sync === 'ifnull' && !balanceExists) {
                        return getBalanceSynced({ networkId, address, sync: 'once' });
                    } else if (!!sync && sync != 'ifnull') {
                        return getBalanceSynced({ networkId, address, sync });
                    }
                }
            }, [networkId, address, contractExists, web3Exists, JSON.stringify(sync)]) ?? {};

        useEffect(() => {
            if (getBalanceAction) dispatch(getBalanceAction);
        }, [dispatch, getBalanceAction]);

        const syncId = syncAction?.payload.id;
        useEffect(() => {
            if (syncAction) dispatch(syncAction);
            return () => {
                if (syncId) dispatch(removeSync(syncId));
            };
        }, [dispatch, syncId]);

        return contract?.balance;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default useGetBalance;

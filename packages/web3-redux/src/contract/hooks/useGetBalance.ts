import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import NetworkCRUD from '../../network/crud.js';
import SyncCRUD from '../../sync/crud.js';
import { GenericSync } from '../../sync/model/index.js';
import { getBalance, getBalanceSynced } from '../actions/index.js';
import ContractCRUD from '../crud.js';

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
    const dispatch = useDispatch();

    const contract = ContractCRUD.hooks.useSelectByIdSingle({ networkId, address });
    const network = NetworkCRUD.hooks.useSelectByIdSingle(networkId);
    const web3Exists = !!(network?.web3 ?? network?.web3Sender);
    const balanceExists = !!contract?.balance;

    //Get balance
    //ifnull => check if current value is defined
    //other => pass as sync param
    const { getBalanceAction, syncAction } =
        useMemo(() => {
            if (networkId && address && web3Exists) {
                if (sync === false || (sync === 'ifnull' && !balanceExists)) {
                    const getBalanceAction = getBalance({ networkId, address });
                    return { getBalanceAction, syncAction: undefined };
                } else if (!!sync && sync != 'ifnull') {
                    return getBalanceSynced({ networkId, address, sync });
                }
            }
        }, [networkId, address, balanceExists, web3Exists, JSON.stringify(sync)]) ?? {};

    useEffect(() => {
        if (getBalanceAction) dispatch(getBalanceAction);
    }, [dispatch, getBalanceAction]);

    const syncId = syncAction?.payload.id;
    useEffect(() => {
        if (syncAction) dispatch(syncAction);
        return () => {
            if (syncId) dispatch(SyncCRUD.actions.delete({ id: syncId }));
        };
    }, [dispatch, syncId]);

    return contract?.balance;
}

export default useGetBalance;

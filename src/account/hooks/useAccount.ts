import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectByIdSingle as selectNetworkByIdSingle } from '../../network/selector';
import { selectByAddressSingle } from '../selector';
import { create, fetchBalanceSynced, fetchNonceSynced } from '../actions';
import { FetchBalanceSyncedActionInput } from '../actions/fetchBalanceSynced';
import { FetchNonceSyncedActionInput } from '../actions/fetchNonceSynced';
import { remove as removeSync } from '../../sync/actions';

export default function useAccount(
    networkId?: string,
    address?: string,
    sync?: {
        balance: FetchBalanceSyncedActionInput['sync'];
        nonce: FetchNonceSyncedActionInput['sync'];
    },
) {
    const dispatch = useDispatch();

    const account = useSelector((state) => selectByAddressSingle(state, networkId, address));
    const network = useSelector((state) => selectNetworkByIdSingle(state, networkId));

    useEffect(() => {
        if (networkId && address && !account) {
            dispatch(create({ networkId, address }));
        }

        let fetchBalanceActionId: string | undefined;
        let fetchNonceActionId: string | undefined;
        if (networkId && address && network && account) {
            //Default no sync
            const fetchBalanceAction = fetchBalanceSynced({ networkId, address, sync: sync?.balance ?? false });
            dispatch(fetchBalanceAction);
            const fetchNonceAction = fetchNonceSynced({ networkId, address, sync: sync?.nonce ?? false });
            dispatch(fetchNonceAction);
            fetchBalanceActionId = fetchBalanceAction.payload.sync?.id;
            fetchNonceActionId = fetchNonceAction.payload.sync?.id;
        }

        return () => {
            if (fetchBalanceActionId) dispatch(removeSync(fetchBalanceActionId));
            if (fetchNonceActionId) dispatch(removeSync(fetchNonceActionId));
        };
    }, [networkId, address, dispatch, account, network]);

    return account;
}

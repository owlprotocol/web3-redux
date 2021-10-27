import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectByIdSingle as selectNetworkByIdSingle } from '../../network/selector';
import { selectByAddressSingle } from '../selector';
import { create, fetchBalanceSynced, fetchNonceSynced } from '../actions';
import { FetchBalanceSyncedActionInput } from '../actions/fetchBalanceSynced';
import { FetchNonceSyncedActionInput } from '../actions/fetchNonceSynced';
import { remove as removeSync } from '../../sync/actions';
import { selectByIdExists as selectSyncExists } from '../../sync/selector';

export default function useAccount(
    networkId?: string,
    address?: string,
    sync?: {
        balance?: FetchBalanceSyncedActionInput['sync'];
        nonce?: FetchNonceSyncedActionInput['sync'];
    },
) {
    const dispatch = useDispatch();

    const account = useSelector((state) => selectByAddressSingle(state, networkId, address));
    const network = useSelector((state) => selectNetworkByIdSingle(state, networkId));
    const networkExists = !!network;
    const accountExists = !!account;

    const createAction = useMemo(() => {
        if (networkId && address && !accountExists) {
            dispatch(create({ networkId, address }));
        }
        return undefined;
    }, [networkId, address, accountExists]);

    const fetchBalanceAction = useMemo(() => {
        if (networkId && address && networkExists && accountExists && sync?.balance) {
            return fetchBalanceSynced({ networkId, address, sync: sync.balance });
        }
        return undefined;
    }, [networkId, address, accountExists, networkExists, sync?.balance]);
    const fetchBalanceId = fetchBalanceAction?.payload.sync?.id;
    const fetchBalanceExists = useSelector((state) => selectSyncExists(state, fetchBalanceId));

    const fetchNonceAction = useMemo(() => {
        if (networkId && address && networkExists && accountExists && sync?.nonce) {
            return fetchNonceSynced({ networkId, address, sync: sync.nonce });
        }
        return undefined;
    }, [networkId, address, accountExists, networkExists, sync?.nonce]);
    const fetchNonceId = fetchNonceAction?.payload.sync?.id;
    const fetchNonceExists = useSelector((state) => selectSyncExists(state, fetchNonceId));

    useEffect(() => {
        if (createAction) dispatch(createAction);
    }, [dispatch, createAction]);

    useEffect(() => {
        //Exists is not a dependency to avoid infinite loop
        if (fetchBalanceAction && !fetchBalanceExists) {
            dispatch(fetchBalanceAction);
        }

        return () => {
            if (fetchBalanceId) dispatch(removeSync(fetchBalanceId));
        };
    }, [dispatch, fetchBalanceAction, fetchBalanceId]);

    useEffect(() => {
        //Exists is not a dependency to avoid infinite loop
        if (fetchNonceAction && !fetchNonceExists) {
            dispatch(fetchNonceAction);
        }

        return () => {
            if (fetchNonceId) dispatch(removeSync(fetchNonceId));
        };
    }, [dispatch, fetchNonceAction, fetchNonceId]);

    return account;
}

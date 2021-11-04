import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectByIdSingle as selectNetworkByIdSingle } from '../../network/selectors';
import { remove as removeSync } from '../../sync/actions';
import { selectByIdExists as selectSyncExists } from '../../sync/selector';

import { getId } from '../model/interface';
import { create, fetchBalanceSynced, fetchNonceSynced } from '../actions';
import { FetchBalanceSyncedActionInput } from '../actions/fetchBalanceSynced';
import { FetchNonceSyncedActionInput } from '../actions/fetchNonceSynced';
import { selectByIdSingle } from '../selectors';

export default function useAccount(
    networkId: string | undefined,
    address: string | undefined,
    sync?: {
        balance?: FetchBalanceSyncedActionInput['sync'];
        nonce?: FetchNonceSyncedActionInput['sync'];
    },
) {
    const dispatch = useDispatch();
    //Coerce t
    const id = networkId && address ? getId({ networkId, address }) : undefined;

    const account = useSelector((state) => selectByIdSingle(state, id));
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
        if (id && networkExists && accountExists && sync?.balance) {
            return fetchBalanceSynced({ id, sync: sync.balance });
        }
        return undefined;
    }, [id, accountExists, networkExists, sync?.balance]);
    const fetchBalanceId = fetchBalanceAction?.payload.sync?.id;
    const fetchBalanceExists = useSelector((state) => selectSyncExists(state, fetchBalanceId));

    const fetchNonceAction = useMemo(() => {
        if (id && networkExists && accountExists && sync?.nonce) {
            return fetchNonceSynced({ id, sync: sync.nonce });
        }
        return undefined;
    }, [id, accountExists, networkExists, sync?.nonce]);
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

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectByIdSingle as selectNetworkByIdSingle } from '../../network/selectors';
import { remove as removeSync } from '../../sync/actions';
import { create, fetchBalanceSynced, fetchNonceSynced, getCode } from '../actions';
import { FetchBalanceSyncedActionInput } from '../actions/fetchBalanceSynced';
import { FetchNonceSyncedActionInput } from '../actions/fetchNonceSynced';
import { selectByIdSingle } from '../selectors';

/**
 * Reads ethereum account data and optionally syncs data.
 * @category Hooks
 *
 */
//TODO: 'once' always refreshses, 'ifnull' should refresh only if empty
export default function useAccount(
    networkId: string | undefined,
    address: string | undefined,
    sync?: {
        balance?: FetchBalanceSyncedActionInput['sync'];
        nonce?: FetchNonceSyncedActionInput['sync'];
        getCode?: false | 'once';
    },
) {
    const dispatch = useDispatch();
    const id = networkId && address ? { networkId, address } : undefined;

    const account = useSelector((state) => selectByIdSingle(state, id));
    const network = useSelector((state) => selectNetworkByIdSingle(state, networkId));
    const networkExists = !!network;
    const accountExists = !!account;

    //Create if inexistant account
    useEffect(() => {
        if (id && !accountExists) dispatch(create({ ...id }));
    }, [dispatch, id, accountExists]);

    //Fetch balance
    const fetchBalanceAction = useMemo(() => {
        if (id && networkExists && accountExists && sync?.balance) {
            return fetchBalanceSynced({ ...id, sync: sync.balance });
        }
        return undefined;
    }, [id, accountExists, networkExists, sync?.balance]);
    //const balanceExists = account?.balance != undefined;
    const fetchBalanceSyncId = fetchBalanceAction?.payload.sync?.id;
    //const fetchBalanceExists = useSelector((state) => selectSyncExists(state, fetchBalanceId));
    useEffect(() => {
        if (fetchBalanceAction) {
            dispatch(fetchBalanceAction);
        }
        return () => {
            if (fetchBalanceSyncId) dispatch(removeSync(fetchBalanceSyncId));
        };
    }, [dispatch, fetchBalanceAction, fetchBalanceSyncId]);

    //Fetch nonce
    const fetchNonceAction = useMemo(() => {
        if (id && networkExists && accountExists && sync?.nonce) {
            return fetchNonceSynced({ ...id, sync: sync.nonce });
        }
        return undefined;
    }, [id, accountExists, networkExists, sync?.nonce]);
    //const nonceExists = account?.nonce != undefined;
    const fetchNonceSyncId = fetchNonceAction?.payload.sync?.id;
    //const fetchNonceExists = useSelector((state) => selectSyncExists(state, fetchNonceId));
    useEffect(() => {
        //Exists is not a dependency to avoid infinite loop
        if (fetchNonceAction) {
            dispatch(fetchNonceAction);
        }
        return () => {
            if (fetchNonceSyncId) dispatch(removeSync(fetchNonceSyncId));
        };
    }, [dispatch, fetchNonceAction, fetchNonceSyncId]);

    //Get code
    const getCodeAction = useMemo(() => {
        if (id && networkExists && accountExists && sync?.getCode) {
            return getCode({ ...id });
        }
        return undefined;
    }, [id, accountExists, networkExists, sync?.getCode]);
    const getCodeExists = account?.code != undefined;

    useEffect(() => {
        if (getCodeAction && !getCodeExists) dispatch(getCodeAction);
    }, [dispatch, getCodeAction]);

    return account;
}

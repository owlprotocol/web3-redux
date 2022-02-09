import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectByIdSingle as selectNetworkByIdSingle } from '../../network/selectors';
import { remove as removeSync } from '../../sync/actions';
import { GenericSync } from '../../sync/model';
import { getNonceSynced } from '../actions';
import { selectByIdSingle } from '../selectors';

/**
 * Get Contract bytecode
 * @category Hooks
 *
 */
export function useGetNonce(
    networkId: string | undefined,
    address: string | undefined,
    sync = 'ifnull' as 'ifnull' | GenericSync | false,
) {
    const dispatch = useDispatch();
    const id = networkId && address ? { networkId, address } : undefined;

    const contract = useSelector((state) => selectByIdSingle(state, id));
    const network = useSelector((state) => selectNetworkByIdSingle(state, networkId));
    const web3Exists = !!(network?.web3 ?? network?.web3Sender);
    const nonceExists = contract?.nonce != undefined;

    //Get nonce
    const { getNonceAction, syncAction } =
        useMemo(() => {
            if (networkId && address && web3Exists) {
                if (sync === 'ifnull' && !nonceExists) {
                    return getNonceSynced({ networkId, address, sync: 'once' });
                } else if (!!sync && sync != 'ifnull') {
                    return getNonceSynced({ networkId, address, sync });
                }
            }
        }, [networkId, address, nonceExists, web3Exists, JSON.stringify(sync)]) ?? {};

    useEffect(() => {
        if (getNonceAction) dispatch(getNonceAction);
    }, [dispatch, getNonceAction]);

    const syncId = syncAction?.payload.id;
    useEffect(() => {
        if (syncAction) dispatch(syncAction);
        return () => {
            if (syncId) dispatch(removeSync(syncId));
        };
    }, [dispatch, syncId]);

    return contract?.nonce;
}

export default useGetNonce;

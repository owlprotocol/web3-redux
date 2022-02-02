import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectByIdSingle as selectNetworkByIdSingle } from '../../network/selectors';
import { remove as removeSync } from '../../sync/actions';
import { GenericSync } from '../../sync/model';
import { fetchNonceSynced } from '../actions';
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
    try {
        const dispatch = useDispatch();
        const id = networkId && address ? { networkId, address } : undefined;

        const contract = useSelector((state) => selectByIdSingle(state, id));
        const network = useSelector((state) => selectNetworkByIdSingle(state, networkId));
        const web3Exists = !!(network?.web3 ?? network?.web3Sender);
        const contractExists = !!contract;
        const nonceExists = contract?.nonce != undefined;

        //Get nonce
        const getNonceAction = useMemo(() => {
            if (networkId && address && web3Exists && contractExists) {
                if (sync === 'ifnull' && !nonceExists) {
                    return fetchNonceSynced({ networkId, address, sync: 'once' });
                } else if (!!sync && sync != 'ifnull') {
                    return fetchNonceSynced({ networkId, address, sync });
                }
            }
        }, [networkId, address, contractExists, web3Exists, JSON.stringify(sync)]);

        useEffect(() => {
            const syncId = getNonceAction?.payload.sync?.id;
            if (getNonceAction) dispatch(getNonceAction);
            return () => {
                if (syncId) dispatch(removeSync(syncId));
            };
        }, [dispatch, getNonceAction]);

        return contract?.nonce;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default useGetNonce;

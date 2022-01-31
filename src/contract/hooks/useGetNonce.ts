import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectByIdSingle as selectNetworkByIdSingle } from '../../network/selectors';
import { remove as removeSync } from '../../sync/actions';
import { fetchNonceSynced } from '../actions';
import { GetNonceSyncedActionInput } from '../actions/getNonceSynced';
import { selectByIdSingle } from '../selectors';

/**
 * Get Contract bytecode
 * @category Hooks
 *
 */
export function useGetNonce(
    networkId: string | undefined,
    address: string | undefined,
    fetch = 'ifnull' as 'ifnull' | GetNonceSyncedActionInput['sync'] | false,
) {
    const dispatch = useDispatch();
    const id = networkId && address ? { networkId, address } : undefined;

    const contract = useSelector((state) => selectByIdSingle(state, id));
    const network = useSelector((state) => selectNetworkByIdSingle(state, networkId));
    const web3Exists = !!(network?.web3 ?? network?.web3Sender);
    const contractExists = !!contract;
    const nonceExists = contract?.nonce != undefined;

    //Get nonce
    const getNonceAction = useMemo(() => {
        if (id && web3Exists && contractExists) {
            if (fetch === 'ifnull' && !nonceExists) {
                return fetchNonceSynced({ ...id, sync: 'once' });
            } else if (!!fetch && fetch != 'ifnull') {
                return fetchNonceSynced({ ...id, sync: fetch });
            }
        }
    }, [id, contractExists, web3Exists, fetch]);
    const getNonceSyncId = getNonceAction?.payload.sync?.id;

    useEffect(() => {
        //Exists is not a dependency to avoid infinite loop
        if (getNonceAction) {
            dispatch(getNonceAction);
        }
        return () => {
            if (getNonceSyncId) dispatch(removeSync(getNonceSyncId));
        };
    }, [dispatch, getNonceAction, getNonceSyncId]);

    return contract?.nonce;
}

export default useGetNonce;

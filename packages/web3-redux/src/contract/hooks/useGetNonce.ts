import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import NetworkCRUD from '../../network/crud.js';
import SyncCRUD from '../../sync/crud.js';
import { GenericSync } from '../../sync/model/index.js';
import { getNonceSynced } from '../actions/index.js';
import ContractCRUD from '../crud.js';

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

    const contract = ContractCRUD.hooks.useSelectByIdSingle({ networkId, address });
    const network = NetworkCRUD.hooks.useSelectByIdSingle(networkId);
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
            if (syncId) dispatch(SyncCRUD.actions.delete(syncId));
        };
    }, [dispatch, syncId]);

    return contract?.nonce;
}

export default useGetNonce;

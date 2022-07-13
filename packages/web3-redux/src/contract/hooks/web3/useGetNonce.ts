import { useEffect, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import ErrorCRUD from '../../../error/crud.js';
import NetworkCRUD from '../../../network/crud.js';
import SyncCRUD from '../../../sync/crud.js';
import { GenericSync } from '../../../sync/model/index.js';
import { getNonce, getNonceSynced } from '../../actions/index.js';
import ContractCRUD from '../../crud.js';

/**
 * Get address nonce
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
    const nonce = contract?.nonce;

    const network = NetworkCRUD.hooks.useSelectByIdSingle(networkId);
    const web3Exists = !!(network?.web3 ?? network?.web3Sender);
    const nonceExists = !!contract?.nonce;
    const executeSync = (sync === 'ifnull' && !nonceExists) || !!sync; //refresh

    //Action
    const { getNonceAction, syncAction } =
        useMemo(() => {
            if (networkId && address) {
                if (!!sync && sync != 'ifnull') {
                    return getNonceSynced({ networkId, address, sync });
                } else {
                    const getNonceAction = getNonce({ networkId, address });
                    return { getNonceAction, syncAction: undefined };
                }
            }
        }, [networkId, address, JSON.stringify(sync)]) ?? {};
    //Callback
    const dispatchGetNonce = useCallback(() => {
        if (getNonceAction) dispatch(getNonceAction);
    }, [dispatch, getNonceAction]);
    //Initial call
    useEffect(() => {
        if (web3Exists && executeSync) dispatchGetNonce();
    }, [dispatch, dispatchGetNonce, web3Exists, executeSync]);

    //Sync
    const syncId = syncAction?.payload.id;
    useEffect(() => {
        if (syncAction) dispatch(syncAction);
        return () => {
            if (syncId) dispatch(SyncCRUD.actions.delete({ id: syncId }));
        };
    }, [dispatch, syncId]);

    //Error
    const [reduxError] = ErrorCRUD.hooks.useGet(getNonceAction?.meta.uuid);
    const error = useMemo(() => {
        if (!networkId) return new Error('networkId undefined');
        else if (!address) return new Error('address undefined');
        else if (!!reduxError) {
            const err = new Error(reduxError.errorMessage);
            err.stack = reduxError.stack;
            return err;
        }
    }, [networkId, address, reduxError]);

    const returnOptions = {
        dispatchGetNonce,
        getNonceAction,
        error,
    };

    return [nonce, returnOptions] as [typeof nonce, typeof returnOptions];
}

export default useGetNonce;

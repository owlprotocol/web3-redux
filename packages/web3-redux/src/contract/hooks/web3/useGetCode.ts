import { useEffect, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import ErrorCRUD from '../../../error/crud.js';
import NetworkCRUD from '../../../network/crud.js';
import { getCode } from '../../actions/index.js';
import ContractCRUD from '../../crud.js';

/**
 * Get Contract bytecode
 * @category Hooks
 *
 */
export function useGetCode(
    networkId: string | undefined,
    address: string | undefined,
    sync = 'ifnull' as 'ifnull' | false,
) {
    const dispatch = useDispatch();

    const contract = ContractCRUD.hooks.useSelectByIdSingle({ networkId, address });
    const code = contract?.balance;

    const network = NetworkCRUD.hooks.useSelectByIdSingle(networkId);
    const web3Exists = !!(network?.web3 ?? network?.web3Sender);
    const codeExists = !!contract?.balance;
    const executeSync = (sync === 'ifnull' && !codeExists) || !!sync; //refresh

    //Action
    const getCodeAction = useMemo(() => {
        if (networkId && address) {
            return getCode({ networkId, address });
        }
    }, [networkId, address]);
    //Callback
    const dispatchGetCode = useCallback(() => {
        if (getCodeAction) dispatch(getCodeAction);
    }, [dispatch, getCodeAction]);

    //Initial call
    useEffect(() => {
        if (web3Exists && executeSync) dispatchGetCode();
    }, [dispatch, dispatchGetCode, web3Exists, executeSync]);

    //Error
    const reduxErrorResponse = ErrorCRUD.hooks.useGet(getCodeAction?.meta.uuid);
    const reduxError = reduxErrorResponse === 'loading' ? undefined : reduxErrorResponse;
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
        dispatchGetCode,
        getCodeAction,
        error,
    };

    return [code, returnOptions] as [typeof code, typeof returnOptions];
}

export default useGetCode;

import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import NetworkCRUD from '../../network/crud.js';
import { getCode } from '../actions/index.js';
import ContractCRUD from '../crud.js';

/**
 * Get Contract bytecode
 * @category Hooks
 *
 */
export function useGetCode(
    networkId: string | undefined,
    address: string | undefined,
    fetch = 'ifnull' as 'ifnull' | true | false,
) {
    const dispatch = useDispatch();

    const contract = ContractCRUD.hooks.useSelectByIdSingle({ networkId, address });
    const network = NetworkCRUD.hooks.useSelectByIdSingle(networkId);
    const web3Exists = !!(network?.web3 ?? network?.web3Sender);
    const codeExists = !!contract?.code;

    //Get code
    const getCodeAction = useMemo(() => {
        if (networkId && address && web3Exists && ((fetch === 'ifnull' && !codeExists) || fetch === true)) {
            return getCode({ networkId, address });
        }
    }, [networkId, address, web3Exists, fetch]);

    useEffect(() => {
        if (getCodeAction) dispatch(getCodeAction);
    }, [dispatch, getCodeAction]);

    return contract?.code;
}

export default useGetCode;

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectByIdSingle as selectNetworkByIdSingle } from '../../network/selectors';
import { getCode } from '../actions';
import { selectByIdSingle } from '../selectors';

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
    const id = networkId && address ? { networkId, address } : undefined;

    const contract = useSelector((state) => selectByIdSingle(state, id));
    const network = useSelector((state) => selectNetworkByIdSingle(state, networkId));
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

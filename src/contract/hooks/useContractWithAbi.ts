import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AbiItem } from 'web3-utils';
import { create } from '../actions';
import { selectByIdSingle } from '../selectors';

/**
 * @category Hooks
 *
 * Creates a contract/EOA if it doesn't exist.
 * Optional abi parameter also sets the contract's ABI.
 * This hook is mostly used as a building block by other hooks to make sure the contract is in the store.
 *
 */
export function useContractWithAbi(
    networkId: string | undefined,
    address: string | undefined,
    abi?: AbiItem[] | undefined,
) {
    const dispatch = useDispatch();
    const contract = useSelector((state) =>
        selectByIdSingle(state, networkId && address ? { networkId, address } : undefined),
    );
    const contractExists = !!contract;
    //Create contract if inexistant
    useEffect(() => {
        if (networkId && address && !contractExists) dispatch(create({ networkId, address, abi }));
    }, [dispatch, networkId, address, contractExists]);

    return contract;
}

export default useContractWithAbi;

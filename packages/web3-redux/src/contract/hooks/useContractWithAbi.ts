import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AbiItem } from '../../utils/web3-utils/index.js';
import ContractCRUD from '../crud.js';

/**
 * Creates a contract/EOA if it doesn't exist.
 * Optional abi parameter also sets the contract's ABI.
 * This hook is mostly used as a building block by other hooks to make sure the contract is in the store.
 * @category Hooks
 *
 */
export function useContractWithAbi(
    networkId: string | undefined,
    address: string | undefined,
    abi?: AbiItem[] | undefined,
) {
    const dispatch = useDispatch();
    const contract = useSelector((state) => ContractCRUD.selectors.selectByIdSingle(state, { networkId, address }));
    const contractExists = !!contract;
    //Create contract if inexistant
    useEffect(() => {
        if (networkId && address && !contractExists) dispatch(ContractCRUD.actions.create({ networkId, address, abi }));
    }, [dispatch, networkId, address, contractExists]);

    return contract;
}

export default useContractWithAbi;

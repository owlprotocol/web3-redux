import { useContractWithAbi } from './useContractWithAbi.js';
import { useContractCall } from './useContractCall.js';
import * as IERC165 from '../../abis/utils/introspection/IERC165.sol/IERC165.json';

/**
 * Contract hook for ERC165 interface.
 * Fetch if contract supports interface.
 * @category Hooks
 *
 */
export function useERC165(networkId: string | undefined, address: string | undefined, interfaceId: string | undefined) {
    //Create abi in store if non-existant
    useContractWithAbi(networkId, address, IERC165.abi as any);

    return useContractCall(networkId, address, 'supportsInterface', [interfaceId], { sync: 'once' });
}

/**
 * Alias for useERC165.
 * @category Hooks
 *
 */
export const useSupportsInterface = useERC165;

export default useSupportsInterface;

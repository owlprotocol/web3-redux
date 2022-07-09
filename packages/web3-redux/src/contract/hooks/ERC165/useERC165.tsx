import useERC165SupportsInterface from './useERC165SupportsInterface.js';
import { useContractWithAbi } from '../useContractWithAbi.js';
import IERC165Artifact from '../../../artifacts/@openzeppelin/contracts/utils/introspection/IERC165.sol/IERC165.json';

/**
 * Contract hook for ERC165 interface.
 * Fetch if contract supports interface.
 * @category Hooks
 *
 */
export function useERC165(networkId: string | undefined, address: string | undefined, interfaceId: string | undefined) {
    //Create abi in store if non-existant
    useContractWithAbi(networkId, address, IERC165Artifact.abi as any);

    const [value] = useERC165SupportsInterface(networkId, address, [interfaceId]);
    return value;
}

/**
 * Alias for useERC165.
 * @category Hooks
 *
 */
export const useSupportsInterface = useERC165;
export default useSupportsInterface;

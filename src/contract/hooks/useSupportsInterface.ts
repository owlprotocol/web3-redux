import useContractCall from './useContractCall';

/**
 * @category Hooks
 * @param networkId
 * @param address
 * @param interfaceId
 * Fetch if contract supports interface.
 * Note that you must first add an IERC165 contract to the store with `useContract(networkId, address, IER165.abi);`
 *
 */
export function useSupportsInterface(
    networkId: string | undefined,
    address: string | undefined,
    interfaceId: string | undefined,
) {
    return useContractCall(networkId, address, 'supportsInterface', [interfaceId], { sync: 'once' });
}

export default useSupportsInterface;
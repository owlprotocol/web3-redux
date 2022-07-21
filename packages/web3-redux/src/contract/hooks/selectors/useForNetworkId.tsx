import ContractCRUD from '../../crud.js';
/**
 * Get all contract tags
 */
export function useForNetworkId(networkId?: string | undefined) {
    return ContractCRUD.hooks.useSelectWhere({ networkId });
}

export default useForNetworkId;

import ContractCRUD from '../../crud.js';
import { map, uniq, flatten, compact, filter } from '../../../utils/lodash/index.js';
/**
 * Get all contract tags
 */
export function useGetTags(networkId?: string | undefined) {
    let contracts = ContractCRUD.hooks.useSelectAll();
    if (networkId) contracts = filter(contracts, (c) => c.networkId === networkId);

    const tags = compact(uniq(flatten(map(contracts, 'tags'))));
    return tags;
}

export default useGetTags;

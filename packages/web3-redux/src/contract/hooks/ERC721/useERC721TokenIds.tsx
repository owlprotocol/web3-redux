import useERC721Transfer from './useERC721Transfer.js';
import { ADDRESS_0 } from '../../../data.js';
import { compact, uniq } from '../../../utils/lodash/index.js';
import { UseEventsOptions } from '../useEvents.js';

export const useERC721TokenIds = (
    networkId: string | undefined,
    address: string | undefined,
    options?: UseEventsOptions,
) => {
    const [Transfer, returnOptions] = useERC721Transfer(networkId, address, { from: ADDRESS_0 }, options);
    if (!Transfer) return [[], returnOptions] as [string[], typeof returnOptions];

    const tokenIds = uniq(compact(Transfer.map((t) => t.returnValues?.tokenId)));
    return [tokenIds, returnOptions] as [typeof tokenIds, typeof returnOptions];
};
export default useERC721TokenIds;

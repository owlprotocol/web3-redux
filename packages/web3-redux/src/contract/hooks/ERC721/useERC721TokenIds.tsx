import useERC721Transfer from './useERC721Transfer.js';
import { ADDRESS_0 } from '../../../data.js';
import { compact, uniq } from '../../../utils/lodash/index.js';
import { UseEventsOptions } from '../useEvents.js';
import useContract from '../useContract.js';
import { IERC721MetadataArtifact } from '../../../abis/index.js';

export const useERC721TokenIds = (
    networkId: string | undefined,
    address: string | undefined,
    options?: UseEventsOptions,
) => {
    //Create abi in store if non-existant
    useContract(networkId, address, { abi: IERC721MetadataArtifact.abi });

    const [Transfer, returnOptions] = useERC721Transfer(networkId, address, { from: ADDRESS_0 }, options);
    if (!Transfer) return [[], returnOptions] as [string[], typeof returnOptions];

    const tokenIds = uniq(compact(Transfer.map((t) => t.returnValues?.tokenId)));
    return [tokenIds, returnOptions] as [typeof tokenIds, typeof returnOptions];
};
export default useERC721TokenIds;

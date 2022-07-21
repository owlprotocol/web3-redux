import getContractCall from './getContractCall.js';
import { IERC721Enumerable } from '../../typechain/IERC721Enumerable.js';

/**
 * Recursively searches for CID at file at <BASE_CID>/path/to/file
 */
export async function getERC721TotalSupply(
    state: any,
    networkId: string | undefined,
    address: string | undefined,
    tokenId: number | undefined,
) {
    if (!tokenId) return undefined;

    const returnValue = await getContractCall<IERC721Enumerable, 'totalSupply'>(
        state,
        networkId,
        address,
        'totalSupply',
    );
    return returnValue;
}

export default getERC721TotalSupply;

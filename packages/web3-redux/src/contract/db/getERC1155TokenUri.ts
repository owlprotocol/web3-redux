import getContractCall from './getContractCall.js';
import { IERC1155MetadataURI } from '../../typechain/IERC1155MetadataURI.js';

/**
 * Recursively searches for CID at file at <BASE_CID>/path/to/file
 */
export async function getERC1155TokenUri(
    state: any,
    networkId: string | undefined,
    address: string | undefined,
    tokenId: number | undefined,
) {
    if (!tokenId) return undefined;

    const returnValue = await getContractCall<IERC1155MetadataURI, 'uri'>(state, networkId, address, 'uri', [tokenId]);
    //TODO: Token uri formatting
    return returnValue;
}

export default getERC1155TokenUri;

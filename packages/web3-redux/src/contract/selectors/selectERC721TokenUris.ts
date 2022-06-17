import invariant from 'tiny-invariant';
import selectERC721TokenIds from './selectERC721TokenIds.js';
import selectContractCall from './selectContractCallById.js';
import { isAddress } from '../../utils/web3-utils/index.js';

export const selectERC721TokenUris = (
    state: any,
    networkId: string | undefined,
    address: string | undefined,
    tokenIds?: string[],
) => {
    if (!networkId || !address) return undefined;
    if (address) invariant(isAddress(address), `${address} invalid contract address!`);
    const addressChecksum = address.toLowerCase();

    //Programmatic method - baseURI + tokenId
    //Find first tokenId with defined uri
    const tokendIdData = selectERC721TokenIds(state, networkId, addressChecksum);
    const tokenIdsAll = tokendIdData ? tokendIdData[0] : [];
    let tokenId0: string;
    let tokenUri0: string | undefined;
    for (const tokenId of tokenIdsAll) {
        tokenId0 = tokenId;
        tokenUri0 = selectContractCall(state, { networkId, address: addressChecksum }, 'tokenURI', {
            args: [tokenId0],
        }) as string | undefined;
        if (tokenUri0) break;
    }

    if (!tokenIds) tokenIds = tokenIdsAll;
    if (tokenUri0) {
        //{id} substring
        if (tokenUri0.search('{id}') >= 0) {
            return tokenIds.map((tokenId) => tokenUri0!.replaceAll('{id}', tokenId));
        }

        //pattern match url splitting
        const tokenUri0Split = tokenUri0.split('/');
        const tokenUri0BaseUri = tokenUri0Split.slice(0, tokenUri0Split.length - 1).join('/');
        const tokenUri0EndPath = tokenUri0Split[tokenUri0Split.length - 1];
        if (tokenUri0EndPath === `${tokenId0!}`) {
            return tokenIds.map((tokenId) => `${tokenUri0BaseUri}/${tokenId}`);
        } else if (tokenUri0EndPath === `${tokenId0!}.json`) {
            return tokenIds.map((tokenId) => `${tokenUri0BaseUri}/${tokenId}.json`);
        }
    }
    //RPC Method
    const tokenUris = tokenIds.map((tokenId) => {
        return selectContractCall(state, { networkId, address: addressChecksum }, 'tokenURI', {
            args: [tokenId],
        }) as string | undefined;
    });

    return tokenUris;
};

export default selectERC721TokenUris;

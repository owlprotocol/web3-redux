import invariant from 'tiny-invariant';
import selectERC721TokenIds from './selectERC721TokenIds.js';
import selectContractCall from './selectContractCallById.js';
import { isAddress, toChecksumAddress } from '../../utils/web3-utils/index.js';

export const selectERC721TokenUris = (state: any, networkId: string | undefined, address: string | undefined) => {
    if (!networkId || !address) return undefined;
    if (address) invariant(isAddress(address), `${address} invalid contract address!`);
    const addressChecksum = toChecksumAddress(address.slice());

    const tokendIdData = selectERC721TokenIds(state, networkId, addressChecksum);
    const tokenIds = tokendIdData ? tokendIdData[0] : [];
    if (tokenIds.length == 0) return [];

    //Programmatic method - baseURI + tokenId
    const tokenId0 = tokenIds[0];
    const tokenUri0 = selectContractCall(state, { networkId, address: addressChecksum }, 'tokenURI', {
        args: [tokenId0],
    }) as string | undefined;

    if (tokenUri0) {
        //{id} substring
        if (tokenUri0.search('{id}') >= 0) {
            return tokenIds.map((tokenId) => tokenUri0.replaceAll('{id}', tokenId));
        }

        //pattern match url splitting
        const tokenUri0Split = tokenUri0.split('/');
        const tokenUri0BaseUri = tokenUri0Split.slice(0, tokenUri0Split.length - 1).join('/');
        const tokenUri0EndPath = tokenUri0Split[tokenUri0Split.length - 1];
        if (tokenUri0EndPath === `${tokenId0}`) {
            return tokenIds.map((tokenId) => `${tokenUri0BaseUri}/${tokenId}`);
        } else if (tokenUri0EndPath === `${tokenId0}.json`) {
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

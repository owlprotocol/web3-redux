import { useEffect, useMemo, useState } from 'react';
import { URL } from 'url';
import IERC721 from '../../abis/token/ERC721/IERC721.sol/IERC721.json';
import IERC721Metadata from '../../abis/token/ERC721/extensions/IERC721Metadata.sol/IERC721Metadata.json';

import { GenericSync } from '../../sync/model';
import { createEventSync } from '../../sync/model/EventSync';

import useContractWithAbi from './useContractWithAbi';
import useContractCall from './useContractCall';
import useEvents, { UseEventsOptions } from './useEvents';
import useIpfs from '../../ipfs/hooks/useIpfs';
import axios from 'axios';

const IERC721FullAbi = [...IERC721.abi, ...IERC721Metadata.abi];

/**
 * @category Hooks
 * @param networkId
 * @param address
 * @param interfaceId
 * Contract hook for ERC721 interface. Will automatically set ABI if not set already.
 *
 */
export function useERC721(
    networkId: string | undefined,
    address: string | undefined,
    tokenId: string | undefined,
    sync?: {
        ownerOf?: 'ifnull' | GenericSync | false | 'onTransfer'; //Update call on Transfer event
        tokenURI?: 'ifnull' | GenericSync | false;
        TransferEventsOptions?: UseEventsOptions;
        ApprovalEventsOptions?: UseEventsOptions;
    },
) {
    //Create abi in store if non-existant
    useContractWithAbi(networkId, address, IERC721FullAbi as any);

    //Refresh call action will get set by the callSyncedAction() creator, we pass an empty array as an argument
    //We also disable sync if networkId/address undefined to avoid unpredictable behaviour
    const onTransferSync =
        networkId && address && tokenId ? createEventSync(networkId, [], address, 'Transfer', [{ tokenId }]) : false;
    const ownerOfSync = sync?.ownerOf === 'onTransfer' ? onTransferSync : sync?.ownerOf ?? 'ifnull'; //Sync ownership
    const tokenURISync = sync?.tokenURI ?? 'ifnull';
    const TransferEventsOptions = sync?.TransferEventsOptions ?? { sync: false, past: false }; //Sync token Transfer events, default just reads data
    const ApprovalEventsOptions = sync?.ApprovalEventsOptions ?? { sync: false, past: false }; //Sync token Approval events, default just reads data

    //Static values
    const name = useContractCall(networkId, address, 'name', [], { sync: 'ifnull' });
    const symbol = useContractCall(networkId, address, 'symbol', [], {
        sync: 'ifnull',
    });

    //if ownerOf is 'Transfer' we disable hook sync and dispatch our own custom solution
    const ownerOf = useContractCall(networkId, address, 'ownerOf', [tokenId], {
        sync: ownerOfSync,
    });
    const tokenURI = useContractCall(networkId, address, 'tokenURI', [tokenId], {
        sync: tokenURISync,
    }) as string | undefined;

    const uri = tokenURI ? new URL(tokenURI) : undefined;
    //Check NFT Metadata
    //If IPFS
    const isIpfsURI = uri?.protocol === 'ipfs:';
    const ipfsPath = isIpfsURI ? tokenURI?.replace('ipfs://', '') : undefined;
    const { data: ipfsContent, contentId } = useIpfs(ipfsPath);

    //If HTTP(S)
    //TODO: cache for http content
    const isHttpURI = uri?.protocol === 'http:' || uri?.protocol === 'https:';
    const [httpContent, sethttpContent] = useState(undefined as any);
    useEffect(() => {
        //Get http api content
        if (tokenURI && isHttpURI) {
            axios.get(tokenURI).then((response) => {
                sethttpContent(response.data);
            });
        } else {
            sethttpContent(undefined);
        }
    }, [isHttpURI, tokenURI]);

    const metadata = ipfsContent ?? httpContent;

    //Events
    const Transfer = useEvents(networkId, address, 'Transfer', { tokenId }, TransferEventsOptions);
    const Approval = useEvents(networkId, address, 'Approval', { tokenId }, ApprovalEventsOptions);

    //IPFS
    //TODO: Use tokenURI to fetch NFT metadata

    const values = useMemo(() => {
        return {
            name,
            symbol,
            ownerOf,
            tokenURI,
            metadata,
            contentId,
            Transfer,
            Approval,
        };
    }, [name, symbol, ownerOf, tokenURI, Transfer, Approval, metadata, contentId]);

    return values;
}

//Alias
export const useNFT = useERC721;

export default useERC721;

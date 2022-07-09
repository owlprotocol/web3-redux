import { useMemo } from 'react';
import useERC721TokenURI from './useERC721TokenURI.js';
import useERC721OwnerOf from './useERC721OwnerOf.js';
import { useContractWithAbi } from '../useContractWithAbi.js';
import { useContractCall } from '../useContractCall.js';
import { useEvents, UseEventsOptions } from '../useEvents.js';
import { IERC721Metadata } from '../../../typechain/IERC721Metadata.js';
import { IERC721MetadataArtifact } from '../../../abis/index.js';

import { GenericSync } from '../../../sync/model/index.js';
import { createEventSync } from '../../../sync/model/EventSync.js';

import { useURI } from '../../../ipfs/hooks/useURI.js';

/**
 * Contract hook for ERC721 interface.
 * Will automatically set ABI if not set already.
 * @category Hooks
 *
 */
export function useERC721(
    networkId: string | undefined,
    address: string | undefined,
    tokenId: string | undefined,
    sync?: {
        ownerOf?: 'ifnull' | GenericSync | false | 'onTransfer'; //Update call on Transfer event
        tokenURI?: 'ifnull' | GenericSync | false;
        metadata?: boolean;
        TransferEventsOptions?: UseEventsOptions;
        ApprovalEventsOptions?: UseEventsOptions;
    },
) {
    //Create abi in store if non-existant
    useContractWithAbi(networkId, address, IERC721MetadataArtifact.abi as any);

    //Refresh call action will get set by the callSyncedAction() creator, we pass an empty array as an argument
    //We also disable sync if networkId/address undefined to avoid unpredictable behaviour
    const onTransferSync =
        networkId && address && tokenId ? createEventSync(networkId, [], address, 'Transfer', [{ tokenId }]) : false;
    const ownerOfSync = sync?.ownerOf === 'onTransfer' ? onTransferSync : sync?.ownerOf ?? 'ifnull'; //Sync ownership
    const tokenURISync = sync?.tokenURI ?? 'ifnull';
    const TransferEventsOptions = sync?.TransferEventsOptions ?? { sync: false, past: false }; //Sync token Transfer events, default just reads data
    const ApprovalEventsOptions = sync?.ApprovalEventsOptions ?? { sync: false, past: false }; //Sync token Approval events, default just reads data

    //Static values
    const [name] = useContractCall<IERC721Metadata, 'name'>(networkId, address, 'name');
    const [symbol] = useContractCall<IERC721Metadata, 'symbol'>(networkId, address, 'symbol');

    //if ownerOf is 'Transfer' we disable hook sync and dispatch our own custom solution
    const [ownerOf] = useERC721OwnerOf(networkId, address, [tokenId], {
        sync: ownerOfSync,
    });

    const [tokenURI] = useERC721TokenURI(networkId, address, [tokenId], {
        sync: tokenURISync,
    });

    const [metadata, { contentId }] = useURI(sync?.metadata ? tokenURI : undefined);

    //Events
    const Transfer = useEvents<IERC721Metadata, 'Transfer'>(
        networkId,
        address,
        'Transfer',
        { tokenId },
        TransferEventsOptions,
    );
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

/**
 * Alias for useERC721.
 * @category Hooks
 *
 */
export const useNFT = useERC721;

export default useERC721;

import { useMemo } from 'react';
import { useContractWithAbi } from './useContractWithAbi.js';
import { useContractCall } from './useContractCall.js';
import { useEvents, UseEventsOptions } from './useEvents.js';
import { IERC721Metadata } from '../../abis/index.js';

import { GenericSync } from '../../sync/model/index.js';
import { createEventSync } from '../../sync/model/EventSync.js';

import { useURI } from '../../ipfs/hooks/useURI.js';

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
    useContractWithAbi(networkId, address, IERC721Metadata.abi as any);

    //Refresh call action will get set by the callSyncedAction() creator, we pass an empty array as an argument
    //We also disable sync if networkId/address undefined to avoid unpredictable behaviour
    const onTransferSync =
        networkId && address && tokenId ? createEventSync(networkId, [], address, 'Transfer', [{ tokenId }]) : false;
    const ownerOfSync = sync?.ownerOf === 'onTransfer' ? onTransferSync : sync?.ownerOf ?? 'ifnull'; //Sync ownership
    const tokenURISync = sync?.tokenURI ?? 'ifnull';
    const TransferEventsOptions = sync?.TransferEventsOptions ?? { sync: false, past: false }; //Sync token Transfer events, default just reads data
    const ApprovalEventsOptions = sync?.ApprovalEventsOptions ?? { sync: false, past: false }; //Sync token Approval events, default just reads data

    //Static values
    const [name] = useContractCall(networkId, address, 'name', [], { sync: 'ifnull' });
    const [symbol] = useContractCall(networkId, address, 'symbol', [], {
        sync: 'ifnull',
    });

    //if ownerOf is 'Transfer' we disable hook sync and dispatch our own custom solution
    const [ownerOf] = useContractCall(networkId, address, 'ownerOf', [tokenId], {
        sync: ownerOfSync,
    });
    const [tokenURI] = useContractCall(networkId, address, 'tokenURI', [tokenId], {
        sync: tokenURISync,
    }) as [string | undefined, any];

    const [metadata, { contentId }] = useURI(tokenURI, sync?.metadata);

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

/**
 * Alias for useERC721.
 * @category Hooks
 *
 */
export const useNFT = useERC721;

export default useERC721;

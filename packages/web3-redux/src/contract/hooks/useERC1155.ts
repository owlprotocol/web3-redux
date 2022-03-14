import { useMemo } from 'react';
import invariant from 'tiny-invariant';
import { useContractWithAbi } from './useContractWithAbi.js';
import { useContractCall } from './useContractCall.js';
import { useEvents, UseEventsOptions } from './useEvents.js';
import { isAddress } from '../../utils/web3-utils/index.js';
import { IERC1155MetadataURI } from '../../abis/index.js';

import { GenericSync } from '../../sync/model/index.js';
import { createEventSync } from '../../sync/model/EventSync.js';

/**
 * Contract hook for ERC1155 interface.
 * Will automatically set ABI if not set already.
 * @category Hooks
 *
 */
export function useERC1155(
    networkId: string | undefined,
    address: string | undefined,
    balanceOfAddress: string | undefined,
    balanceOfTokenId: string | undefined,
    sync?: {
        //totalSupply?: 'ifnull' | GenericSync | false;
        balanceOf?: 'ifnull' | GenericSync | false | 'onTransfer'; //Update call on Transfer event
        TransferEventsOptions?: UseEventsOptions;
    },
) {
    //Create abi in store if non-existant
    useContractWithAbi(networkId, address, IERC1155MetadataURI.abi as any);
    if (address) invariant(isAddress(address), `${address} invalid contract address!`);
    if (balanceOfAddress) invariant(isAddress(balanceOfAddress), `${balanceOfAddress} invalid contract address!`);

    //Default sync params
    //const totalSupplySync = sync?.totalSupply ?? 'ifnull'; //Some tokens might have dynamic supply
    //Refresh call action will get set by the callSyncedAction() creator, we pass an empty array as an argument
    //We also disable sync if networkId/address undefined to avoid unpredictable behaviour
    const onTransferSync =
        networkId && address && balanceOfAddress
            ? createEventSync(networkId, [], address, 'TransferSingle', [
                { from: balanceOfAddress, id: balanceOfTokenId },
                { to: balanceOfAddress, id: balanceOfTokenId },
            ])
            : false;
    const balanceOfSync = sync?.balanceOf === 'onTransfer' ? onTransferSync : sync?.balanceOf ?? 'ifnull'; //Sync user balance
    const TransferEventsOptions = sync?.TransferEventsOptions ?? { sync: false, past: false }; //Sync token Transfer events, default just reads data

    //Static values
    //const totalSupply = useContractCall(networkId, address, 'totalSupply', [balanceOfTokenId], { sync: totalSupplySync });
    const uri = useContractCall(networkId, address, 'uri', [balanceOfTokenId]) as string | undefined;
    const uriParsed = uri && balanceOfTokenId ? uri.replace('{id}', balanceOfTokenId) : undefined;
    //if balanceOf is 'Transfer' we disable hook sync and dispatch our own custom solution
    const balanceOf = useContractCall(networkId, address, 'balanceOf', [balanceOfAddress, balanceOfTokenId], {
        sync: balanceOfSync,
    });

    //Events
    const TransferFrom = useEvents(
        networkId,
        address,
        'TransferSingle',
        { from: balanceOfAddress, id: balanceOfTokenId },
        TransferEventsOptions,
    );
    const TransferTo = useEvents(
        networkId,
        address,
        'TransferSingle',
        { to: balanceOfAddress, id: balanceOfTokenId },
        TransferEventsOptions,
    );

    const values = useMemo(() => {
        return {
            //totalSupply,
            uri: uriParsed,
            balanceOf,
            TransferFrom,
            TransferTo,
        };
    }, [, /*totalSupply*/ uri, balanceOf, TransferFrom, TransferTo]);

    return values;
}

/**
 * Alias for
 * @category Hooks
 *
 */
export const useMultiToken = useERC1155;

export default useERC1155;

import { useMemo } from 'react';
import useERC20Transfer from './useERC20Transfer.js';
import useERC20Approval from './useERC20Approval.js';
import { UseEventsOptions } from '../useEvents.js';
import { useContractCall } from '../useContractCall.js';
import { IERC20Metadata } from '../../../typechain/IERC20Metadata.js';
import { IERC20MetadataArtifact } from '../../../abis/index.js';

import { GenericSync } from '../../../sync/model/index.js';
import { createEventSync } from '../../../sync/model/EventSync.js';
import useContract from '../useContract.js';

/**
 * Contract hook for ERC20 interface.
 * Will automatically set ABI if not set already.
 * @category Hooks
 *
 */
export function useERC20(
    networkId: string | undefined,
    address: string | undefined,
    balanceOfAddress: string | undefined,
    sync?: {
        totalSupply?: 'ifnull' | GenericSync | false;
        balanceOf?: 'ifnull' | GenericSync | false | 'onTransfer'; //Update call on Transfer event
        TransferEventsOptions?: UseEventsOptions;
        ApprovalEventsOptions?: UseEventsOptions;
    },
) {
    //Create abi in store if non-existant
    useContract(networkId, address, { abi: IERC20MetadataArtifact.abi });

    //Default sync params
    const totalSupplySync = sync?.totalSupply ?? 'ifnull'; //Some tokens might have dynamic supply
    //Refresh call action will get set by the callSyncedAction() creator, we pass an empty array as an argument
    //We also disable sync if networkId/address undefined to avoid unpredictable behaviour
    const onTransferSync =
        networkId && address && balanceOfAddress
            ? createEventSync(networkId, [], address, 'Transfer', [
                { from: balanceOfAddress },
                { to: balanceOfAddress },
            ])
            : false;
    const balanceOfSync = sync?.balanceOf === 'onTransfer' ? onTransferSync : sync?.balanceOf ?? 'ifnull'; //Sync user balance
    const TransferEventsOptions = sync?.TransferEventsOptions ?? { sync: false, past: false }; //Sync token Transfer events, default just reads data
    const ApprovalEventsOptions = sync?.ApprovalEventsOptions ?? { sync: false, past: false }; //Sync token Approval events, default just reads data

    //Static values
    const [name] = useContractCall<IERC20Metadata, 'name'>(networkId, address, 'name');
    const [symbol] = useContractCall<IERC20Metadata, 'symbol'>(networkId, address, 'symbol');
    const [decimals] = useContractCall<IERC20Metadata, 'decimals'>(networkId, address, 'decimals');
    const [totalSupply] = useContractCall<IERC20Metadata, 'totalSupply'>(networkId, address, 'totalSupply', [], {
        sync: totalSupplySync,
    });

    //if balanceOf is 'Transfer' we disable hook sync and dispatch our own custom solution
    const [balanceOf] = useContractCall<IERC20Metadata, 'balanceOf'>(
        networkId,
        address,
        'balanceOf',
        [balanceOfAddress],
        {
            sync: balanceOfSync,
        },
    );

    //Events
    const [TransferFrom] = useERC20Transfer(networkId, address, { from: balanceOfAddress }, TransferEventsOptions);
    const [TransferTo] = useERC20Transfer(networkId, address, { to: balanceOfAddress }, TransferEventsOptions);
    const [ApprovalOwner] = useERC20Approval(networkId, address, { owner: balanceOfAddress }, ApprovalEventsOptions);
    const [ApprovalSpender] = useERC20Approval(
        networkId,
        address,
        { spender: balanceOfAddress },
        ApprovalEventsOptions,
    );

    const values = useMemo(() => {
        return {
            name,
            symbol,
            decimals,
            totalSupply,
            balanceOf,
            TransferFrom,
            TransferTo,
            ApprovalOwner,
            ApprovalSpender,
        };
    }, [name, symbol, decimals, totalSupply, balanceOf, TransferFrom, TransferTo, ApprovalOwner, ApprovalSpender]);

    return values;
}

/**
 * Alias for useERC20.
 * @category Hooks
 *
 */
export const useToken = useERC20;

export default useERC20;

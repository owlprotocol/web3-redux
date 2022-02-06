import { useMemo } from 'react';
import IERC20 from '../../abis/IERC20Metadata.json';

import { GenericSync } from '../../sync/model';
import { createEventSync } from '../../sync/model/EventSync';

import useContractWithAbi from './useContractWithAbi';
import useContractCall from './useContractCall';
import useEvents, { UseEventsOptions } from './useEvents';

/**
 * @category Hooks
 * @param networkId
 * @param address
 * @param interfaceId
 * Contract hook for ERC20 interface. Will automatically set ABI if not set already.
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
    useContractWithAbi(networkId, address, IERC20.abi as any);

    //Default sync params
    const totalSupplySync = sync?.totalSupply ?? 'ifnull'; //Some tokens might have dynamic supply
    //Refresh call action will get set by the callSyncedAction() creator, we pass an empty array as an argument
    //We also disable sync if networkId/address undefined to avoid unpredictable behaviour
    const onTransferSync =
        networkId && address
            ? createEventSync(networkId, [], address, 'Transfer', [{ from: address }, { to: address }])
            : false;
    const balanceOfSync = sync?.balanceOf === 'onTransfer' ? onTransferSync : sync?.balanceOf ?? 'ifnull'; //Sync user balance
    const TransferEventsOptions = sync?.TransferEventsOptions ?? { sync: false, past: false }; //Sync token Transfer events, default just reads data
    const ApprovalEventsOptions = sync?.ApprovalEventsOptions ?? { sync: false, past: false }; //Sync token Approval events, default just reads data

    //Static values
    const name = useContractCall(networkId, address, 'name', [], { sync: 'ifnull' });
    const symbol = useContractCall(networkId, address, 'symbol', [], {
        sync: 'ifnull',
    });
    const decimals = useContractCall(networkId, address, 'decimals', [], {
        sync: 'ifnull',
    });
    const totalSupply = useContractCall(networkId, address, 'totalSupply', [], { sync: totalSupplySync });

    //if balanceOf is 'Transfer' we disable hook sync and dispatch our own custom solution
    const balanceOf = useContractCall(networkId, address, 'balanceOf', [balanceOfAddress], {
        sync: balanceOfSync,
    });

    //Events
    const TransferFrom = useEvents(networkId, address, 'Transfer', { from: balanceOfAddress }, TransferEventsOptions);
    const TransferTo = useEvents(networkId, address, 'Transfer', { to: balanceOfAddress }, TransferEventsOptions);
    const ApprovalOwner = useEvents(networkId, address, 'Approval', { owner: balanceOfAddress }, ApprovalEventsOptions);
    const ApprovalSpender = useEvents(
        networkId,
        address,
        'Approval',
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

//Alias
export const useToken = useERC20;

export default useERC20;

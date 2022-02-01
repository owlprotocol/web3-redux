import { useEffect, useMemo } from 'react';
import IERC20 from '../../abis/IERC20Metadata.json';

import useContractWithAbi from './useContractWithAbi';
import useContractCall from './useContractCall';
import useEvents, { UseEventsOptions } from './useEvents';
import { CallSyncedActionInput } from '../actions/callSynced';
import { useDispatch } from 'react-redux';

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
        totalSupply?: 'ifnull' | CallSyncedActionInput['sync'] | false;
        balanceOf?: 'ifnull' | CallSyncedActionInput['sync'] | false | 'onTransfer'; //Update call on Transfer event
        TransferEventsOptions?: UseEventsOptions;
        ApprovalEventsOptions?: UseEventsOptions;
    },
) {
    const dispatch = useDispatch();

    //Default sync params
    const totalSupplySync = sync?.totalSupply ?? 'ifnull'; //Some tokens might have dynamic supply
    const balanceOfSync = sync?.balanceOf ?? 'ifnull'; //Sync user balance

    const TransferEventsOptions = sync?.TransferEventsOptions ?? { sync: false, past: false }; //Sync token Transfer events, default just reads data
    const ApprovalEventsOptions = sync?.ApprovalEventsOptions ?? { sync: false, past: false }; //Sync token Approval events, default just reads data

    //Create abi in store if non-existant
    useContractWithAbi(networkId, address, IERC20.abi as any);

    //Static values
    const [name] = useContractCall(networkId, address, 'name', [], { sync: 'ifnull' });
    const [symbol] = useContractCall(networkId, address, 'symbol', [], {
        sync: 'ifnull',
    });
    const [decimals] = useContractCall(networkId, address, 'decimals', [], {
        sync: 'ifnull',
    });
    const [totalSupply] = useContractCall(networkId, address, 'totalSupply', [], { sync: totalSupplySync });

    //if balanceOf is 'Transfer' we disable hook sync and dispatch our own custom solution
    const [balanceOf] = useContractCall(networkId, address, 'balanceOf', [balanceOfAddress], {
        sync: balanceOfSync === 'onTransfer' ? 'ifnull' : balanceOfSync,
    });
    //const onTransferFrom = networkId ? createEventSync(networkId, 'Transfer', { from: balanceOfAddress }) : undefined;
    //const onTransferTo = networkId ? createEventSync(networkId, 'Transfer', { to: balanceOfAddress }) : undefined;

    //TODO: Dispatch Sync middleware
    useEffect(() => {
        if (balanceOfSync === 'onTransfer') {
        }
        return () => {
            //cleanup
        };
    }, [dispatch, networkId, address, balanceOfAddress, balanceOfSync]);

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

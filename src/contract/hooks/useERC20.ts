import IERC20 from '../../abis/IERC20Metadata.json';

import useContract from './useContract';
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
        totalSupplySync?: 'ifnull';
        balanceOf?: 'ifnull';
        TransferEventsOptions?: UseEventsOptions;
        ApprovalEventsOptions?: UseEventsOptions;
    },
) {
    //Default sync params
    const totalSupplySync = sync?.totalSupplySync ?? 'ifnull'; //Some tokens might have dynamic supply
    const balanceOfSync = sync?.balanceOf ?? 'ifnull'; //Sync user balance
    const TransferEventsOptions = sync?.TransferEventsOptions ?? { sync: false, past: false }; //Sync token Transfer events, default just reads data
    const ApprovalEventsOptions = sync?.ApprovalEventsOptions ?? { sync: false, past: false }; //Sync token Approval events, default just reads data

    //Create abi in store if non-existant
    useContract(networkId, address, IERC20.abi as any);

    //Static values
    const [name] = useContractCall(networkId, address, 'name', [], { sync: 'ifnull' });
    const [symbol] = useContractCall(networkId, address, 'symbol', [], { sync: 'ifnull' });
    const [decimals] = useContractCall(networkId, address, 'decimals', [], { sync: 'ifnull' });
    const [totalSupply] = useContractCall(networkId, address, 'totalSupply', [], { sync: totalSupplySync });

    const [balanceOf] = useContractCall(networkId, address, 'balanceOf', [balanceOfAddress], { sync: balanceOfSync });
    const [TransferFrom] = useEvents(networkId, address, 'Transfer', { from: balanceOfAddress }, TransferEventsOptions);
    const [TransferTo] = useEvents(networkId, address, 'Transfer', { to: balanceOfAddress }, TransferEventsOptions);
    const [ApprovalOwner] = useEvents(
        networkId,
        address,
        'Approval',
        { owner: balanceOfAddress },
        ApprovalEventsOptions,
    );
    const [ApprovalSpender] = useEvents(
        networkId,
        address,
        'Approval',
        { spender: balanceOfAddress },
        ApprovalEventsOptions,
    );

    return { name, symbol, decimals, totalSupply, balanceOf, TransferFrom, TransferTo, ApprovalOwner, ApprovalSpender };
}

//Alias
export const useToken = useERC20;

export default useERC20;

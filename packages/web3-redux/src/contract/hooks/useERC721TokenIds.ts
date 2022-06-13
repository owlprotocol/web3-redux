import { useSelector } from 'react-redux';
import { useContractWithAbi } from './useContractWithAbi.js';
import { useEvents, UseEventsOptions } from './useEvents.js';
import { IERC721Metadata } from '../../abis/index.js';

import { selectERC721TokenIds } from '../selectors/selectERC721TokenIds.js';

const ADDRESS_0 = '0x0000000000000000000000000000000000000000';

/**
 * Contract hook for ERC721 tokenIds.
 * @category Hooks
 *
 */
export function useERC721TokenIds(
    networkId: string | undefined,
    address: string | undefined,
    options?: UseEventsOptions,
) {
    //Create abi in store if non-existant
    useContractWithAbi(networkId, address, IERC721Metadata.abi as any);

    //Default fetch past actions
    const past = options?.past ?? true;
    //Mint Transfers
    const Transfer = useEvents(networkId, address, 'Transfer', { from: ADDRESS_0 }, { ...options, past });
    const tokenIds = useSelector((state: any) => selectERC721TokenIds(state, networkId, address));

    return [tokenIds, { Transfer }];
}

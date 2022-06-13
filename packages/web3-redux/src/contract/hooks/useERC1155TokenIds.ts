import { useSelector } from 'react-redux';
import { useContractWithAbi } from './useContractWithAbi.js';

import { useEvents, UseEventsOptions } from './useEvents.js';
import { IERC1155MetadataURI } from '../../abis/index.js';

import { selectERC1155TokenIds } from '../selectors/selectERC1155TokenIds.js';

const ADDRESS_0 = '0x0000000000000000000000000000000000000000';

/**
 * Contract hook for ERC1155 tokenIds.
 * @category Hooks
 *
 */
export function useERC1155TokenIds(
    networkId: string | undefined,
    address: string | undefined,
    options?: UseEventsOptions,
) {
    //Create abi in store if non-existant
    useContractWithAbi(networkId, address, IERC1155MetadataURI.abi as any);

    //Default fetch past actions
    const past = options?.past ?? true;
    //Mint Transfers
    const TransferSingle = useEvents(networkId, address, 'TransferSingle', { from: ADDRESS_0 }, { ...options, past });
    const TransferBatch = useEvents(networkId, address, 'TransferBatch', { from: ADDRESS_0 }, { ...options, past });
    const tokenIds = useSelector((state: any) => selectERC1155TokenIds(state, networkId, address));

    return [tokenIds, { TransferSingle, TransferBatch }];
}

import { IERC1155, TransferBatch } from '../../../typechain/IERC1155.js';
import { contractEventsHookFactory } from '../useEvents.js';

export const useERC1155TransferBatch = contractEventsHookFactory<
    IERC1155,
    'TransferBatch',
    TransferBatch['returnValues']
>('TransferBatch');
export default useERC1155TransferBatch;

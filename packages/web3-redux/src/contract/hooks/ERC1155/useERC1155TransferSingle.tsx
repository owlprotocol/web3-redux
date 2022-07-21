import { IERC1155, TransferSingle } from '../../../typechain/IERC1155.js';
import { contractEventsHookFactory } from '../useEvents.js';

export const useERC1155TransferSingle = contractEventsHookFactory<
    IERC1155,
    'TransferSingle',
    TransferSingle['returnValues']
>('TransferSingle');
export default useERC1155TransferSingle;

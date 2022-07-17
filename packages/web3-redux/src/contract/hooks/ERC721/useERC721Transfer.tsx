import { IERC721, Transfer } from '../../../typechain/IERC721.js';
import { contractEventsHookFactory } from '../useEvents.js';

export const useERC721Transfer = contractEventsHookFactory<IERC721, 'Transfer', Transfer['returnValues']>('Transfer');
export default useERC721Transfer;

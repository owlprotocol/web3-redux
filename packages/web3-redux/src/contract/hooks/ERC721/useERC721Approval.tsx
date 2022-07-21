import { IERC721, Approval } from '../../../typechain/IERC721.js';
import { contractEventsHookFactory } from '../useEvents.js';

export const useERC721Approval = contractEventsHookFactory<IERC721, 'Approval', Approval['returnValues']>('Approval');
export default useERC721Approval;

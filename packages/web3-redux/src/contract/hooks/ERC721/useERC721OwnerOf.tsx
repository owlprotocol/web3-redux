import { IERC721 } from '../../../typechain/IERC721.js';
import { contractCallHookFactory } from '../useContractCall.js';

export const useERC721OwnerOf = contractCallHookFactory<IERC721, 'ownerOf'>('ownerOf');
export default useERC721OwnerOf;

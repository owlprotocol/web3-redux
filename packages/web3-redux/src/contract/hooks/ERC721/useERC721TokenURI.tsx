import { IERC721Metadata } from '../../../typechain/IERC721Metadata.js';
import { contractCallHookFactory } from '../useContractCall.js';

export const useERC721TokenURI = contractCallHookFactory<IERC721Metadata, 'tokenURI'>('tokenURI');
export default useERC721TokenURI;

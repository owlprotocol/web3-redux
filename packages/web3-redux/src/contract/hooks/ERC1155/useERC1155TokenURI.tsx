import { IERC1155MetadataURI } from '../../../typechain/IERC1155MetadataURI.js';
import { contractCallHookFactory } from '../useContractCall.js';

export const useERC1155TokenURI = contractCallHookFactory<IERC1155MetadataURI, 'uri'>('uri');
export default useERC1155TokenURI;

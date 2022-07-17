import { IERC165 } from '../../../typechain/IERC165.js';
import { contractCallHookFactory } from '../useContractCall.js';

export const useERC165SupportsInterface = contractCallHookFactory<IERC165, 'supportsInterface'>('supportsInterface');
export default useERC165SupportsInterface;

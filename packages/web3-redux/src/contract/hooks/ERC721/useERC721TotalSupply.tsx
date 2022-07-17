import { IERC721Enumerable } from '../../../typechain/IERC721Enumerable.js';
import { contractCallHookFactory } from '../useContractCall.js';

export const useERC721TotalSupply = contractCallHookFactory<IERC721Enumerable, 'totalSupply'>('totalSupply');
export default useERC721TotalSupply;

import { IERC1155 } from '../../../typechain/IERC1155.js';
import { contractCallHookFactory } from '../useContractCall.js';

export const useERC1155BalanceOf = contractCallHookFactory<IERC1155, 'balanceOf'>('balanceOf');
export default useERC1155BalanceOf;

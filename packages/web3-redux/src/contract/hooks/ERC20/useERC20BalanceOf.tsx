import { IERC20 } from '../../../typechain/IERC20.js';
import { contractCallHookFactory } from '../useContractCall.js';

export const useERC20BalanceOf = contractCallHookFactory<IERC20, 'balanceOf'>('balanceOf');
export default useERC20BalanceOf;

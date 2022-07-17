import { IERC20, Transfer } from '../../../typechain/IERC20.js';
import { contractEventsHookFactory } from '../useEvents.js';

export const useERC20Transfer = contractEventsHookFactory<IERC20, 'Transfer', Transfer['returnValues']>('Transfer');
export default useERC20Transfer;

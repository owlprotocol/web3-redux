import { IERC20, Approval } from '../../../typechain/IERC20.js';
import { contractEventsHookFactory } from '../useEvents.js';

export const useERC20Approval = contractEventsHookFactory<IERC20, 'Approval', Approval['returnValues']>('Approval');
export default useERC20Approval;

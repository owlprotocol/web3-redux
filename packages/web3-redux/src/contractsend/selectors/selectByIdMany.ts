import select from './select.js';
import { ContractSend, ContractSendId, getId } from '../model/interface.js';
import { memoizeArrayByRef } from '../../utils/memo/index.js';

/** @category Selectors */
function selectByIdMany(state: any, ids?: ContractSendId[]): (ContractSend | null)[] {
    if (!ids) return select(state); //Return all

    const idsStr = ids.map((id) => getId(id));
    const result = select(state, idsStr);
    return memoizeArrayByRef(result);
}

export default selectByIdMany;

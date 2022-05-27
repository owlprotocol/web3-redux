import select from './select.js';
import { Transaction, TransactionId, getId } from '../model/interface.js';
import { memoizeArrayByRef } from '../../utils/memo/index.js';

/** @category Selectors */
export function selectByIdMany(state: any, ids?: TransactionId[]): (Transaction | null)[] {
    if (!ids) return select(state); //Return all

    const idsStr = ids.map((id) => getId(id));
    const result = select(state, idsStr);
    return result;
    //return memoizeArrayByRef(result);
}

export default selectByIdMany;

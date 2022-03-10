import select from './select';
import { Transaction, TransactionId, getId } from '../model/interface';
import { memoizeArrayByRef } from '../../utils/memo/memoizeArrayByRef';

/** @category Selectors */
export function selectByIdMany(state: any, ids?: TransactionId[]): (Transaction | null)[] {
    if (!ids) return select(state); //Return all

    const idsStr = ids.map((id) => getId(id));
    const result = select(state, idsStr);
    return memoizeArrayByRef(result);
}

export default selectByIdMany;

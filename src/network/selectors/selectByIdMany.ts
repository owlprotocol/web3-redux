import select from './select';
import { Network, Id } from '../model/interface';
import memoizeArrayByRef from '../../utils/memo/memoizeArrayByRef';

/** @category Selectors */
function selectByIdMany(state: any, ids?: Id[]): (Network | null)[] {
    if (!ids) return select(state); //Return all

    const result = select(state, ids);
    return memoizeArrayByRef(result);
}

export default selectByIdMany;

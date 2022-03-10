import select from './select';
import { Network } from '../model/interface';
import { memoizeArrayByRef } from '../../utils/memo';

/** @category Selectors */
function selectByIdMany(state: any, ids?: string[]): (Network | null)[] {
    if (!ids) return select(state); //Return all

    const result = select(state, ids);
    return memoizeArrayByRef(result);
}

export default selectByIdMany;

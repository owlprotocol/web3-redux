import select from './select.js';
import { Network } from '../model/interface.js';
//import { memoizeArrayByRef } from '../../utils/memo/index.js';

/** @category Selectors */
function selectByIdMany(state: any, ids?: string[]): (Network | null)[] {
    if (!ids) return select(state); //Return all

    const result = select(state, ids);
    return result;
    //return memoizeArrayByRef(result);
}

export default selectByIdMany;

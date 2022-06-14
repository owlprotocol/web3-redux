import select from './select.js';
import { Http } from '../model/index.js';
//import { memoizeArrayByRef } from '../../utils/index.js';

/** @category Selectors */
function selectByIdMany(state: any, ids?: string[]): (Http | null)[] {
    if (!ids) return select(state); //Return all
    const result = select(state, ids);
    return result;
    //return memoizeArrayByRef(result);
}

export default selectByIdMany;

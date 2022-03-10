import select from './select.js';
import { _4ByteSignature } from '../model/index.js';
import { memoizeArrayByRef } from '../../utils/index.js';

/** @category Selectors */
function selectByIdMany(state: any, ids?: string[]): (_4ByteSignature | null)[] {
    if (!ids) return select(state); //Return all
    const result = select(state, ids);
    return memoizeArrayByRef(result);
}

export default selectByIdMany;

import select from './select';
import { _4ByteSignature } from '../model';
import { memoizeArrayByRef } from '../../utils';

/** @category Selectors */
function selectByIdMany(state: any, ids?: string[]): (_4ByteSignature | null)[] {
    if (!ids) return select(state); //Return all
    const result = select(state, ids);
    return memoizeArrayByRef(result);
}

export default selectByIdMany;

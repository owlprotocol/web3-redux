import { isCID } from '../../utils';
import select from './select';
import { Ipfs } from '../model/interface';
import memoizeArrayByRef from '../../utils/memo/memoizeArrayByRef';

/** @category Selectors */
function selectByIdMany(state: any, ids?: string[]): (Ipfs | null)[] {
    if (!ids) return select(state); //Return all
    ids.forEach((id) => isCID(id));

    const result = select(state, ids);
    return memoizeArrayByRef(result);
}

export default selectByIdMany;

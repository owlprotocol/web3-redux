import select from './select.js';
import { isCIDGuard } from '../../utils/index.js';
import { Ipfs } from '../model/interface.js';
import { memoizeArrayByRef } from '../../utils/memo/index.js';

/** @category Selectors */
export function selectByIdMany(state: any, ids?: string[]): (Ipfs | null)[] {
    if (!ids) return select(state); //Return all
    ids.forEach((id) => isCIDGuard(id));

    const result = select(state, ids);
    return memoizeArrayByRef(result);
}

export default selectByIdMany;

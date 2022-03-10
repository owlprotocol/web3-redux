import select from './select';
import { isCIDGuard } from '../../utils';
import { Ipfs } from '../model/interface';
import { memoizeArrayByRef } from '../../utils/memo';

/** @category Selectors */
export function selectByIdMany(state: any, ids?: string[]): (Ipfs | null)[] {
    if (!ids) return select(state); //Return all
    ids.forEach((id) => isCIDGuard(id));

    const result = select(state, ids);
    return memoizeArrayByRef(result);
}

export default selectByIdMany;

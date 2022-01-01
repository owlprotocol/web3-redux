import select from './select';
import { BlockId, getId } from '../model/id';
import BlockHeader from '../model/BlockHeader';
import memoizeArrayByRef from '../../utils/memo/memoizeArrayByRef';

/** @category Selectors */
function selectByIdMany(state: any, ids?: BlockId[]): (BlockHeader | null)[] {
    if (!ids) return select(state); //Return all

    const idsStr = ids.map((id) => getId(id));
    const result = select(state, idsStr);
    return memoizeArrayByRef(result);
}

export default selectByIdMany;

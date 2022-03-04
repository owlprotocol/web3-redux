import { select } from './select';
import { BlockId, getId } from '../model/id';
import BlockTransaction from '../model/BlockTransaction';
import memoizeArrayByRef from '../../utils/memo/memoizeArrayByRef';

/** @category Selectors */
export function selectByIdMany(state: any, ids?: BlockId[]): (BlockTransaction | undefined)[] {
    if (!ids) return select(state) as (BlockTransaction | undefined)[]; //Return all

    const idsStr = ids.map((id) => getId(id));
    const result = select(state, idsStr as string & string[]) as (BlockTransaction | undefined)[];
    return memoizeArrayByRef(result);
}

export default selectByIdMany;

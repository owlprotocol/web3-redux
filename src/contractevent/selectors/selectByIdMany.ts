import select from './select';
import { ContractEvent, IdArgs, getId } from '../model/interface';
import memoizeArrayByRef from '../../utils/memo/memoizeArrayByRef';

/** @category Selectors */
function selectByIdMany(state: any, ids?: IdArgs[]): (ContractEvent | null)[] {
    if (!ids) return select(state); //Return all

    const idsStr = ids.map((id) => getId(id));
    const result = select(state, idsStr);
    return memoizeArrayByRef(result);
}

export default selectByIdMany;

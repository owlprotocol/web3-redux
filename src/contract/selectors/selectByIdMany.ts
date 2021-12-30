import select from './select';
import { Contract, IdArgs, getId, BaseWeb3Contract } from '../model/interface';
import memoizeArrayByRef from '../../utils/memo/memoizeArrayByRef';

/** @category Selectors */
function selectByIdMany<T extends BaseWeb3Contract = BaseWeb3Contract>(
    state: any,
    ids?: IdArgs[],
): (Contract<T> | null)[] {
    if (!ids) return select(state); //Return all

    const idsStr = ids.map((id) => getId(id));
    const result = select(state, idsStr);
    return memoizeArrayByRef(result);
}

export default selectByIdMany;

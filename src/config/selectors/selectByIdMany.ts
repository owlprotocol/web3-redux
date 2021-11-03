import select from './select';
import Interface from '../model/interface';
import memoizeArrayByRef from '../../utils/memo/memoizeArrayByRef';

function selectByIdMany(state: any, ids?: string[]): (Interface | null)[] {
    if (!ids) return select(state); //Return all

    const result = select(state, ids);
    return memoizeArrayByRef(result);
}

export default selectByIdMany;

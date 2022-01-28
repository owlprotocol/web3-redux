import select from './select';
import { _4ByteSignature, SignatureId, getId } from '../model';
import { memoizeArrayByRef } from '../../utils';

/** @category Selectors */
function selectByIdMany(state: any, ids?: SignatureId[]): (_4ByteSignature | null)[] {
    if (!ids) return select(state); //Return all
    const idsStr = ids.map((id) => getId(id));
    const result = select(state, idsStr);
    return memoizeArrayByRef(result);
}

export default selectByIdMany;

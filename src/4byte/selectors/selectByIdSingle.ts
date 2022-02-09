import { _4ByteSignature, SignatureId, getId } from '../model';
import select from './select';

/** @category Selectors */
function selectByIdSingle(state: any, id: SignatureId | undefined): _4ByteSignature | undefined {
    if (!id) return undefined;

    const idStr = getId(id);
    return select(state, idStr) as _4ByteSignature | undefined;
}

export default selectByIdSingle;

import { _4ByteSignature } from '../model';
import select from './select';

/** @category Selectors */
function selectByIdSingle(state: any, id: string | undefined): _4ByteSignature | undefined {
    if (!id) return undefined;

    return select(state, id) as _4ByteSignature | undefined;
}

export default selectByIdSingle;

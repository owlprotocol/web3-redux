import { BlockId, getId } from '../model/id';
import { BlockHeader } from '../model/BlockHeader';
import select from './select';

/** @category Selectors */
function selectByIdSingle(state: any, id: BlockId | undefined): BlockHeader | undefined {
    if (!id) return undefined;

    const idStr = getId(id);
    return select(state, idStr) as BlockHeader | undefined;
}

export default selectByIdSingle;

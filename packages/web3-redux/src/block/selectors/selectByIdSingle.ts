import { select } from './select';
import { BlockId, getId } from '../model/id';
import BlockTransaction from '../model/BlockTransaction';

/** @category Selectors */
export function selectByIdSingle(state: any, id: BlockId | undefined): BlockTransaction | undefined {
    if (!id) return undefined;

    const idStr = getId(id);
    return select(state, idStr as string & string[]) as BlockTransaction | undefined;
}

export default selectByIdSingle;

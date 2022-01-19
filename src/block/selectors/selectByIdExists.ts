import { BlockId } from '../model/id';
import selectByIdSingle from './selectByIdSingle';

/** @category Selectors */
function selectByIdExists(state: any, id: BlockId | undefined): boolean {
    if (!id) return false;

    return !!selectByIdSingle(state, id);
}

export default selectByIdExists;

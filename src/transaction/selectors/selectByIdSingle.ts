import { Transaction, IdArgs, getId } from '../model/interface';
import select from './select';

/** @category Selectors */
function selectByIdSingle(state: any, id: IdArgs | undefined): Transaction | undefined {
    if (!id) return undefined;

    const idStr = getId(id);
    return select(state, idStr) as Transaction | undefined;
}

export default selectByIdSingle;

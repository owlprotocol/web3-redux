import { ContractEvent, IdArgs, getId } from '../model/interface';
import select from './select';

/** @category Selectors */
function selectByIdSingle(state: any, id: IdArgs | undefined): ContractEvent | undefined {
    if (!id) return undefined;

    const idStr = getId(id);
    return select(state, idStr) as ContractEvent | undefined;
}

export default selectByIdSingle;

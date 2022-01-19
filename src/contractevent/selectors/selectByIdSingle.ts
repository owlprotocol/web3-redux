import { ContractEvent, ContractEventId, getId } from '../model/interface';
import select from './select';

/** @category Selectors */
function selectByIdSingle(state: any, id: ContractEventId | undefined): ContractEvent | undefined {
    if (!id) return undefined;

    const idStr = getId(id);
    return select(state, idStr) as ContractEvent | undefined;
}

export default selectByIdSingle;

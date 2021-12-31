import { ContractEventIndex } from '../model/interface';
import select from './select';

/** @category Selectors */
function selectByIdSingle(state: any, id: string | undefined): ContractEventIndex | undefined {
    if (!id) return undefined;

    return select(state, id) as ContractEventIndex | undefined;
}

export default selectByIdSingle;

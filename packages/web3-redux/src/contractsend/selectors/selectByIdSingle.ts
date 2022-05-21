import select from './select.js';
import { ContractSend } from '../model/interface.js';

/** @category Selectors */
function selectByIdSingle(state: any, id: string | undefined): ContractSend | undefined {
    if (!id) return undefined;
    return select(state, id) as ContractSend | undefined;
}

export default selectByIdSingle;

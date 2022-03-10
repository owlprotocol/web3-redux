import selectByIdSingle from './selectByIdSingle.js';
import { ContractEventId } from '../model/index.js';

/** @category Selectors */
function selectByIdExists(state: any, id: ContractEventId | undefined): boolean {
    if (!id) return false;

    return !!selectByIdSingle(state, id);
}

export default selectByIdExists;

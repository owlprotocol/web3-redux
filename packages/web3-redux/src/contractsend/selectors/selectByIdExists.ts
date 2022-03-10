import selectByIdSingle from './selectByIdSingle.js';
import { ContractSendId } from '../model/interface.js';

/** @category Selectors */
function selectByIdExists(state: any, id: ContractSendId | undefined): boolean {
    if (!id) return false;

    return !!selectByIdSingle(state, id);
}

export default selectByIdExists;

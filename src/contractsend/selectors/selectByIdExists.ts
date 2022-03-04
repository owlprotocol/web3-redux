import selectByIdSingle from './selectByIdSingle';
import { ContractSendId } from '../model/interface';

/** @category Selectors */
function selectByIdExists(state: any, id: ContractSendId | undefined): boolean {
    if (!id) return false;

    return !!selectByIdSingle(state, id);
}

export default selectByIdExists;

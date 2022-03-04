import selectByIdSingle from './selectByIdSingle';
import { ContractEventId } from '../model';

/** @category Selectors */
function selectByIdExists(state: any, id: ContractEventId | undefined): boolean {
    if (!id) return false;

    return !!selectByIdSingle(state, id);
}

export default selectByIdExists;

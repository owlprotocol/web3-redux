import selectByIdSingle from './selectByIdSingle.js';
import { EthCallId } from '../model/interface.js';

/** @category Selectors */
function selectByIdExists(state: any, id: EthCallId | undefined): boolean {
    if (!id) return false;

    return !!selectByIdSingle(state, id);
}

export default selectByIdExists;

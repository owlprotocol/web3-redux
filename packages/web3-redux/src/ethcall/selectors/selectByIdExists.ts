import selectByIdSingle from './selectByIdSingle';
import { EthCallId } from '../model/interface';

/** @category Selectors */
function selectByIdExists(state: any, id: EthCallId | undefined): boolean {
    if (!id) return false;

    return !!selectByIdSingle(state, id);
}

export default selectByIdExists;

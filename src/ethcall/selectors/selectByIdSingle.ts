import { EthCall, EthCallId, getId } from '../model/interface';
import select from './select';

/** @category Selectors */
function selectByIdSingle(state: any, id: EthCallId | undefined): EthCall | undefined {
    if (!id) return undefined;

    const idStr = getId(id);
    return select(state, idStr) as EthCall | undefined;
}

export default selectByIdSingle;

import select from './select.js';
import { EthCall, EthCallId, getId } from '../model/interface.js';

/** @category Selectors */
function selectByIdSingle(state: any, id: EthCallId | string | undefined): EthCall | undefined {
    if (!id) return undefined;
    if (typeof id === 'string') return select(state, id) as EthCall | undefined;

    const idStr = getId(id);
    return select(state, idStr) as EthCall | undefined;
}

export default selectByIdSingle;
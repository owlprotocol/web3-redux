import select from './select.js';
import { Network } from '../model/interface.js';

/** @category Selectors */
function selectByIdSingle(state: any, id: string | undefined): Network | undefined {
    if (!id) return undefined;
    return select(state, id) as Network | undefined;
}

export default selectByIdSingle;

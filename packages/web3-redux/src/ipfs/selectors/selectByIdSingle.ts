import select from './select.js';
import { isCIDGuard } from '../../utils/index.js';
import { Ipfs } from '../model/interface.js';

/** @category Selectors */
export function selectByIdSingle(state: any, id: string | undefined): Ipfs | undefined {
    if (!id) return undefined;
    isCIDGuard(id);

    return select(state, id) as Ipfs | undefined;
}

export default selectByIdSingle;

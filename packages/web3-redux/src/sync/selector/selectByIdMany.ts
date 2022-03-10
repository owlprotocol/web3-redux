import select from './select.js';
import { Sync } from '../model/index.js';

/** @category Selectors */
function selectByIdMany(state: any, ids?: string[]): (Sync | null)[] {
    return select(state, ids);
}

export default selectByIdMany;

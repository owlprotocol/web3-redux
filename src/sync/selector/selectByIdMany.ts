import { Sync } from '../model';
import select from './select';

/** @category Selectors */
function selectByIdMany(state: any, ids?: string[]): (Sync | null)[] {
    return select(state, ids);
}

export default selectByIdMany;

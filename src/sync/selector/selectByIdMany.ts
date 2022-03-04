import select from './select';
import { Sync } from '../model';

/** @category Selectors */
function selectByIdMany(state: any, ids?: string[]): (Sync | null)[] {
    return select(state, ids);
}

export default selectByIdMany;

import { Sync } from '../model';
import select from './select';

function selectByIdMany(state: any, ids?: string[]): (Sync | null)[] {
    return select(state, ids);
}

export default selectByIdMany;

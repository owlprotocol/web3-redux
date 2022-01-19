import { Network, Id } from '../model/interface';
import select from './select';

/** @category Selectors */
function selectByIdSingle(state: any, id: Id | undefined): Network | undefined {
    if (!id) return undefined;
    return select(state, id) as Network | undefined;
}

export default selectByIdSingle;

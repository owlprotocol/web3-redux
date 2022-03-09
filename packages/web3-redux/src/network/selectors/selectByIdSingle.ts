import select from './select';
import { Network } from '../model/interface';

/** @category Selectors */
function selectByIdSingle(state: any, id: string | undefined): Network | undefined {
    if (!id) return undefined;
    return select(state, id) as Network | undefined;
}

export default selectByIdSingle;

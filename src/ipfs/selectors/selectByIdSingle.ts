import { Ipfs } from '../model/interface';
import select from './select';

/** @category Selectors */
function selectByIdSingle(state: any, id: string | undefined): Ipfs | undefined {
    if (!id) return undefined;

    return select(state, id) as Ipfs | undefined;
}

export default selectByIdSingle;

import { isCID } from '../../utils';
import { Ipfs } from '../model/interface';
import select from './select';

/** @category Selectors */
export function selectByIdSingle(state: any, id: string | undefined): Ipfs | undefined {
    if (!id) return undefined;
    isCID(id);

    return select(state, id) as Ipfs | undefined;
}

export default selectByIdSingle;

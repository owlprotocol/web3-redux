import select from './select';
import { isCIDGuard } from '../../utils';
import { Ipfs } from '../model/interface';

/** @category Selectors */
export function selectByIdSingle(state: any, id: string | undefined): Ipfs | undefined {
    if (!id) return undefined;
    isCIDGuard(id);

    return select(state, id) as Ipfs | undefined;
}

export default selectByIdSingle;

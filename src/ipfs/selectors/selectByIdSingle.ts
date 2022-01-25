import { Ipfs, IpfsId, getId } from '../model/interface';
import select from './select';

/** @category Selectors */
function selectByIdSingle(state: any, id: IpfsId | undefined): Ipfs | undefined {
    if (!id) return undefined;

    const idStr = getId(id);
    return select(state, idStr) as Ipfs | undefined;
}

export default selectByIdSingle;

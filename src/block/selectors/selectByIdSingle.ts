import { Interface, IdArgs, getId } from '../model/interface';
import select from './select';

function selectByIdSingle(state: any, id: IdArgs | undefined): Interface | undefined {
    if (!id) return undefined;

    const idStr = getId(id);
    return select(state, idStr) as Interface | undefined;
}

export default selectByIdSingle;

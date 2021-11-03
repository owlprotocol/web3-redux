import { Interface, IdArgs, getId, BaseWeb3Contract } from '../model/interface';
import select from './select';

function selectByIdSingle<T extends BaseWeb3Contract = BaseWeb3Contract>(
    state: any,
    id: IdArgs | undefined,
): Interface<T> | undefined {
    if (!id) return undefined;

    const idStr = getId(id);
    return select(state, idStr);
}

export default selectByIdSingle;

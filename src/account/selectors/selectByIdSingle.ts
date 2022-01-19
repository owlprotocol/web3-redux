import { Account, AccountId, getId } from '../model/interface';
import select from './select';

/** @category Selectors */
function selectByIdSingle(state: any, id: AccountId | undefined): Account | undefined {
    if (!id) return undefined;

    const idStr = getId(id);
    return select(state, idStr) as Account | undefined;
}

export default selectByIdSingle;

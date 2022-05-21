import { createSelector } from 'redux-orm';
import { name } from '../common.js';
import { getOrm } from '../../orm.js';
import { ContractIndex } from '../model/index.js';
import { memoizeArrayByRef } from '../../utils/memo/index.js';

/** @internal */
const select = createSelector(getOrm()[name]);

/** @category Selectors */
export function selectByIdMany(state: any, ids?: string[]): (ContractIndex | undefined)[] {
    if (!ids) return select(state) as (ContractIndex | undefined)[]; //Return all

    const result = select(state, ids as string & string[]) as (ContractIndex | undefined)[];
    return memoizeArrayByRef(result);
}

export default selectByIdMany;

import { createSelector } from 'redux-orm';
import { name } from '../common.js';
import { getOrm } from '../../orm.js';
import { ContractEventIndex } from '../model/index.js';
import { memoizeArrayByRef } from '../../utils/memo/index.js';

/** @internal */
const select = createSelector(getOrm()[name]);

/** @category Selectors */
export function selectByIdMany(state: any, ids?: string[]): (ContractEventIndex | undefined)[] {
    if (!ids) return select(state) as (ContractEventIndex | undefined)[]; //Return all

    const result = select(state, ids as string & string[]) as (ContractEventIndex | undefined)[];
    return memoizeArrayByRef(result);
}

export default selectByIdMany;

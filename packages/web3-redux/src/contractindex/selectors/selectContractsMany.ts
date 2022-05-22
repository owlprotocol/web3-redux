import { createSelector } from 'redux-orm';
import { Contract } from '../../contract/model/interface.js';
import { getOrm } from '../../orm.js';
import { memoizeArrayByRef } from '../../utils/memo/index.js';

const selector = createSelector(getOrm().ContractIndex.contracts);

/** @category Selectors */
export function selectContractsMany(state: any, ids?: string[]): (Contract[] | undefined)[] {
    if (!ids) return selector(state) as (Contract[] | undefined)[]; //Return all

    const result = selector(state, ids as string & string[]) as (Contract[] | undefined)[];
    return memoizeArrayByRef(result);
}

export default selectContractsMany;

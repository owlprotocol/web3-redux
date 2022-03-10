import { createSelector } from 'redux-orm';
import { Transaction } from '../../transaction/model/interface.js';
import { getOrm } from '../../orm.js';
import { Contract, ContractId, getId, BaseWeb3Contract } from '../model/interface.js';
import { memoizeArrayByRef } from '../../utils/memo/index.js';

/** @internal */
type selectManyType = (state: any, id?: string[]) => Contract[] | undefined;
/** @internal */
const selectMany: selectManyType = createSelector(
    getOrm().Contract,
    getOrm().Contract.fromTransactions,
    getOrm().Contract.toTransactions,
    (contracts: Contract[], fromTransactions: Transaction[][], toTransactions: Transaction[][]) => {
        if (!contracts) return undefined;

        return contracts.map((b, idx) => {
            if (!b) return undefined;
            return { ...b, fromTransactions: fromTransactions[idx], toTransactions: toTransactions[idx] };
        }) as (Contract | undefined)[];
    },
);

/** @category Selectors */
export function selectByIdMany<T extends BaseWeb3Contract = BaseWeb3Contract>(
    state: any,
    ids?: ContractId[],
): (Contract<T> | undefined)[] {
    if (!ids) return selectMany(state) as (Contract<T> | undefined)[]; //Return all

    const idsStr = ids.map((id) => getId(id));
    const result = selectMany(state, idsStr) as (Contract<T> | undefined)[];
    return memoizeArrayByRef(result);
}

export default selectByIdMany;

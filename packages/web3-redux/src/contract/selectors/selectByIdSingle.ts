import { createSelector } from 'redux-orm';
import { Transaction } from '../../transaction/model/interface.js';
import { getOrm } from '../../orm.js';
import { Contract, ContractId, getId, BaseWeb3Contract } from '../model/interface.js';

/** @internal */
type selectSingleType = (state: any, id: string) => Contract | undefined;
/** @internal */
const selectSingle: selectSingleType = createSelector(
    getOrm().Contract,
    getOrm().Contract.fromTransactions,
    getOrm().Contract.toTransactions,
    (contract: Contract, fromTransactions: Transaction[], toTransactions: Transaction[]) => {
        if (!contract) return undefined;
        return { ...contract, fromTransactions, toTransactions };
    },
);

/** @category Selectors */
export function selectByIdSingle<T extends BaseWeb3Contract = BaseWeb3Contract>(
    state: any,
    id: ContractId | undefined,
): Contract<T> | undefined {
    if (!id) return undefined;

    const idStr = getId(id);
    return selectSingle(state, idStr) as Contract<T> | undefined;
}

export default selectByIdSingle;

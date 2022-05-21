import { createSelector } from 'redux-orm';
import { Contract } from '../../contract/model/interface.js';
import { getOrm } from '../../orm.js';

const selector = createSelector(getOrm().ContractIndex.contracts);

/** @category Selectors */
export function selectContracts(state: any, id: string | undefined): Contract[] | undefined {
    const result = selector(state, id) as Contract[] | undefined;
    return result;
}

export default selectContracts;

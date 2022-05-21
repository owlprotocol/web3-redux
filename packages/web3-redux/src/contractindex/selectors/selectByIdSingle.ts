import { createSelector } from 'redux-orm';
import { name } from '../common.js';
import { getOrm } from '../../orm.js';

import { ContractIndex } from '../model/interface.js';

/** @internal */
const select = createSelector(getOrm()[name]);

/** @category Selectors */
export function selectByIdSingle(state: any, id: string | undefined): ContractIndex | undefined {
    if (!id) return undefined;

    return select(state, id) as ContractIndex | undefined;
}

export default selectByIdSingle;

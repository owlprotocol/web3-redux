import { createSelector } from 'redux-orm';
import { name } from '../common';
import { getOrm } from '../../orm';

import { ContractEventIndex } from '../model/interface';

/** @internal */
const select = createSelector(getOrm()[name]);

/** @category Selectors */
export function selectByIdSingle(state: any, id: string | undefined): ContractEventIndex | undefined {
    if (!id) return undefined;

    return select(state, id) as ContractEventIndex | undefined;
}

export default selectByIdSingle;

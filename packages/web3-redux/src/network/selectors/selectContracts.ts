import { createSelector } from 'redux-orm';
import { Contract } from '../../contract/model/index.js';

import { name } from '../common.js';
import { getOrm } from '../../orm.js';

const select = createSelector(getOrm()[name].contracts);
/** @category Selectors */
function selectContracts(state: any, id: string | undefined) {
    if (!id) return undefined;

    //@ts-ignore
    return select(state, id) as Contract[];
}

export default selectContracts;

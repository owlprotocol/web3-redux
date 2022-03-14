import { createSelector } from 'redux-orm';
import { BlockHeader } from '../../block/model/index.js';

import { name } from '../common.js';
import { getOrm } from '../../orm.js';

const select = createSelector(getOrm()[name].blocks);
/** @category Selectors */
function selectBlocks(state: any, id: string | undefined) {
    if (!id) return undefined;

    return select(state, id) as BlockHeader[];
}

export default selectBlocks;

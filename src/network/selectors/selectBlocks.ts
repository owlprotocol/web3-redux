import { createSelector } from 'redux-orm';
import { BlockHeader } from '../../block/model';

import { name } from '../common';
import { getOrm } from '../../orm';

const select = createSelector(getOrm()[name].blocks);
/** @category Selectors */
function selectBlocks(state: any, id: string | undefined) {
    if (!id) return undefined;

    return select(state, id) as BlockHeader[];
}

export default selectBlocks;

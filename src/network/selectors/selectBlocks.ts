import { createSelector } from 'redux-orm';
import { Block } from '../../block/model';

import { name } from '../common';
import { getOrm } from '../../orm';

const select = createSelector(getOrm()[name].blocks);
function selectBlocks(state: any, id: string | undefined) {
    if (!id) return undefined;

    //@ts-ignore
    return select(state, id) as Block[];
}

export default selectBlocks;

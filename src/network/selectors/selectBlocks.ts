import { createSelector } from 'redux-orm';
import { Block } from '../../block';

import { name } from '../common';
import ORM from '../../orm';

const select = createSelector(ORM.orm[name].blocks);
function selectBlocks(state: any, id: string | undefined) {
    if (!id) return undefined;

    //@ts-ignore
    return select(state, id) as Block[];
}

export default selectBlocks;

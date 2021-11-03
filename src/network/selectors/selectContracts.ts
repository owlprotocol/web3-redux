import { createSelector } from 'redux-orm';
import { Contract } from '../../contract/model';

import { name } from '../common';
import { orm } from '../../orm';

const select = createSelector(orm[name].contracts);
function selectContracts(state: any, id: string | undefined) {
    if (!id) return undefined;

    //@ts-ignore
    return select(state, id) as Contract[];
}

export default selectContracts;

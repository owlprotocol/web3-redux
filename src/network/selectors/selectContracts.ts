import { createSelector } from 'redux-orm';
import { Contract } from '../../contract/model';

import { name } from '../common';
import ORM from '../../orm';

const select = createSelector(ORM.orm[name].contracts);
function selectContracts(state: any, id: string | undefined) {
    if (!id) return undefined;

    //@ts-ignore
    return select(state, id) as Contract[];
}

export default selectContracts;

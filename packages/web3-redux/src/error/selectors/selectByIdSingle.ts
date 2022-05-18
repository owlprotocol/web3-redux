import { createSelector } from 'redux-orm';
import { getOrm } from '../../orm.js';
import { Error } from '../model/index.js';

const select = createSelector(getOrm().Error);

/** @category Selectors */
export function selectByIdSingle(state: any, id: string | undefined): Error | undefined {
    if (!id) return undefined;
    return select(state, id) as Error | undefined;
}

export default selectByIdSingle;

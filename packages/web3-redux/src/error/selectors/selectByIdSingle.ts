import { createSelector } from 'redux-orm';
import { getOrm } from '../../orm.js';
import { ReduxError } from '../model/index.js';

const select = createSelector(getOrm().Error);

/** @category Selectors */
export function selectByIdSingle(state: any, id: string | undefined): ReduxError | undefined {
    if (!id) return undefined;
    return select(state, id) as ReduxError | undefined;
}

export default selectByIdSingle;

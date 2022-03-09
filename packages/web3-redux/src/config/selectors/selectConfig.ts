import { createSelector } from 'redux-orm';
import { name } from '../common';
import { getOrm } from '../../orm';
import { Config } from '../model/interface';

/** @internal */
const select = createSelector(getOrm()[name]);

/** @category Selectors */
export const selectConfig = (state: any) => {
    return select(state, 0) as Config;
};

export default selectConfig;

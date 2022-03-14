import { createSelector } from 'redux-orm';
import { name } from '../common.js';
import { getOrm } from '../../orm.js';
import { Config } from '../model/interface.js';

/** @internal */
const select = createSelector(getOrm()[name]);

/** @category Selectors */
export const selectConfig = (state: any) => {
    return select(state, 0) as Config;
};

export default selectConfig;

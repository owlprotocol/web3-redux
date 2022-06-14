import { createSelector } from 'redux-orm';
import { name } from '../common.js';
import { getOrm } from '../../orm.js';

/** @internal */
const select = createSelector(getOrm()[name]);
export default select;
